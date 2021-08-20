import mongoose from "mongoose"

const connection = {}

const connect = async () => {
  if (connection.isConnected) return console.log("Already connected...")
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1)
      return console.log("Use previous connection")
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  console.log("New connection...")
  connection.isConnected = db.connections[0].readyState
}

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log("Not disconnected...")
    }
  }
}

export default { connect, disconnect }
