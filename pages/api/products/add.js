import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"
import { getError } from "../../../utils/error"
import formidableMiddleware from "../../../utils/formidableHandler"

const handler = nc()

handler.use(isAuth)
handler.use(formidableMiddleware)

handler.post(async (req, res) => {
  try {
    await db.connect()
    if (
      !req.body.image ||
      !req.body.name ||
      !req.body.price ||
      !req.body.brand ||
      !req.body.category ||
      !req.body.countInStock ||
      !req.body.description ||
      !req.body.rating ||
      !req.body.numReviews
    )
      return res.status(400).send({ message: "All fields are required" })
    const product = await Product.findOne({ name: req.body.name })
    if (product)
      return res.status(400).send({ message: "Product already exist" })
    if (!req.user.isAdmin)
      return res.status(401).send({ message: "Operation not allowed" })

    await new Product({ ...req.body }).save()
    await db.disconnect()
    res.send(200)
  } catch (err) {
    console.error(err)
    res.status(500).send(getError(err))
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
