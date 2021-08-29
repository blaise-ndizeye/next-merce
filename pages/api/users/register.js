import nc from "next-connect"
import bcrypt from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"
import { signToken } from "../../../utils/auth"

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const { name, email, password } = req.body
  if (typeof name !== "string" || name.length < 3)
    return res
      .status(400)
      .send({ message: "Name must be valid and minimum length of 3" })
  const userExist = await User.findOne({ email })
  if (userExist) return res.status(400).send({ message: "User already exist" })
  const user = await new User({
    name,
    email,
    isAdmin: false,
    password: bcrypt.hashSync(password),
  }).save()
  await db.disconnect()
  const token = signToken(user)
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
})

export default handler
