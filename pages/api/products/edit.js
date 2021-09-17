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
    const { newProduct } = req.body
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
    } = newProduct

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
    const product = await Product.findById(productId)
    if (!product)
      return res.status(400).send({ message: "Product doesn't exist" })
    if (!req.user.isAdmin)
      return res.status(401).send({ message: "Operation not allowed" })
    await Product.updateOne(
      { _id: product.id },
      {
        $set: {
          ...newProduct,
        },
      }
    )
    await db.disconnect()
    res.status(200)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
