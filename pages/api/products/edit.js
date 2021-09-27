import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { isAuth } from "../../../utils/auth"
import { getError } from "../../../utils/error"
import formidableMiddleware from "../../../utils/formidableHandler"

const handler = nc()

handler.use(isAuth)
handler.use(formidableMiddleware)

handler.put(async (req, res) => {
  try {
    await db.connect()
    const {
      productId,
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      rating,
      numReviews,
    } = req.body

    if (
      !name ||
      !price ||
      !brand ||
      !category ||
      !countInStock ||
      !description ||
      !rating ||
      !numReviews
    )
      return res.status(400).send({ message: "All fields are required" })

    const product = await Product.findOne({ _id: productId })
    if (!product)
      return res.status(400).send({ message: "Product doesn't exist" })

    if (!req.user.isAdmin)
      return res
        .status(401)
        .send({ message: "Access denied: Operation not allowed" })

    await Product.updateOne(
      { _id: product.id },
      {
        $set: {
          ...req.body,
          image: req.body.image ? req.body.image : product.image,
        },
      }
    )
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
