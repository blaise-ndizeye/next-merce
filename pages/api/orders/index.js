import nc from "next-connect"
import Order from "../../../models/Order"
import { isAuth } from "../../../utils/auth"
import db from "../../../utils/db"
import { onError } from "../../../utils/error"

const handler = nc({
  onError,
})

handler.use(isAuth)

handler.post(async (req, res) => {
  await db.connect()
  const newOrder = await new Order({ ...req.body, user: req.user._id }).save()
  res.status(201).send(newOrder)
})

export default handler
