import nc from "next-connect"
import jwt from "jsonwebtoken"
import User from "../../../models/User"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"
import sendMail from "../../../utils/mailClient"

const handler = nc()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(400)
        .send({ message: "User with that email doesn't exist" })
    await db.disconnect()

    const secret = process.env.JWT_SECRET + user.password
    const { password, _id } = user
    let resetToken = await jwt.sign({ userId: _id, password }, secret, {
      expiresIn: "2h",
    })
    resetToken = `${resetToken}___${_id}`
    const status = await sendMail({
      emailTo: user.email,
      resetToken,
    })
    if (!status.success)
      return res.status(400).send({ message: status.message })
    res.send(
      `The link to reset the password sent to email: ${email} and is valid for two hours`
    )
  } catch (err) {
    console.log(err)
    res.status(500).send(getError(err))
  }
})

export default handler
