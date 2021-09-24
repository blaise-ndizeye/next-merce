import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"

const handler = nc()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { page, limit, sort } = req.body
    const products = req.body
      ? await Product.find()
          .sort({ _id: sort || 1 })
          .skip(page)
          .limit(limit || 9)
      : await Product.find()
    await db.disconnect()
    res.send(products)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
