import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const { lastId } = req.body
  let products = []
  if (!lastId) {
    products = await Product.find().sort({ _id: -1 }).limit(9)
  } else {
    products = await Product.find({ _id: { $lt: lastId } })
      .sort({ _id: -1 })
      .limit(9)
  }
  await db.disconnect()
  res.send(products)
})

export default handler
