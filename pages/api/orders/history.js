import nc from "next-connect"
import Order from "../../../models/Order"
import { isAuth } from "../../../utils/auth"
import db from "../../../utils/db"
import { getError, onError } from "../../../utils/error"

const handler = nc({
  onError,
})

handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    await db.connect()
    const orders = req.user.isAdmin
      ? await Order.find({ isPaid: true }).sort({ _id: -1 })
      : await Order.find({ user: req.user._id }).sort({ _id: -1 })
    await db.disconnect()
    res.send(orders)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
