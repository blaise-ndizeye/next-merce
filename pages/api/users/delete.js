import nc from "next-connect"
import User from "../../../models/User"
import Order from "../../../models/Order"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"
import { getError } from "../../../utils/error"

const handler = nc()

handler.use(isAuth)

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { userId } = req.body
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).send({ message: "User doesn't exist" })
    await Order.deleteMany({ user: userId })
    await User.deleteOne({ _id: userId })
    await db.disconnect()
    res.send(200)
  } catch (err) {
    console.error(err)
    res.status(500).send(getError(err))
  }
})

export default handler
