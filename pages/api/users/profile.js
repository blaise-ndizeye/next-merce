import nc from "next-connect"
import bcrypt from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"

const handler = nc()

handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect()
  const { _id } = req.user
  console.log(_id)
  const user = await User.findById(_id)
  user.name = req.body.name
  user.email = req.body.email
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password
  await user.save()
  await db.disconnect()
  res.send({ message: "Profile updated successfully" })
})

export default handler
