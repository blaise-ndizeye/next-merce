import jwt from "jsonwebtoken"
import User from "/models/User"

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  )
}

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization)
    return res.status(401).send({ message: "Token is not supplied" })
  const token = authorization.split(" ")[1]
  const verifyJwt = await jwt.verify(token, process.env.JWT_SECRET)
  if (!verifyJwt) return res.status(401).send({ message: "Token is not valid" })
  req.user = verifyJwt
  next()
}

export { signToken, isAuth }
