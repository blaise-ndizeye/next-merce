import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"
import { getError } from "../../../utils/error"

const handler = nc()

handler.use(isAuth)

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { productId } = req.body
    const product = await Product.findOne({ _id: productId })
    if (!product)
      return res.status(400).send({ message: "Product doesn't exist" })
    if (!req.user.isAdmin)
      return res.status(401).send({ message: "Operation not allowed" })
    await Product.deleteOne({ _id: productId })
    await db.disconnect()
    res.send(200)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
