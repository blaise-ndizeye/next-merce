import nc from "next-connect"
import User from "../../../models/User"
import Order from "../../../models/Order"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"
import { getError } from "../../../utils/error"

const handler = nc()

handler.use(isAuth)

handler.get(async (req, res) => {
  try {
    await db.connect()
    const user = await User.findOne({ _id: req.query.user })
    if (!user) return res.status(400).send({ message: "User doesn't exist" })
    await db.disconnect()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send(getError(err))
  }
})

export default handler
