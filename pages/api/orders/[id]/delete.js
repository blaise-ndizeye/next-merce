import nc from "next-connect"
import Order from "../../../../models/Order"
import db from "../../../../utils/db"
import { isAuth } from "../../../../utils/auth"
import { getError } from "../../../../utils/error"

const handler = nc()

handler.use(isAuth)

handler.delete(async (req, res) => {
  try {
    await db.connect()
    const order = await Order.findById(req.query.id)
    if (!order) return res.status(400).send({ message: "Order not found" })
    await Order.deleteOne({ _id: req.query.id })
    await db.disconnect()
    res.send(200)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
