import nc from "next-connect"
import bcrypt from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"
import { signToken } from "../../../utils/auth"
import { getError } from "../../../utils/error"

const handler = nc()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { email, password } = req.body
    const user = await User.findOne({ email })
    await db.disconnect()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user)
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(401).send({ message: "Invalid email or password" })
    }
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
