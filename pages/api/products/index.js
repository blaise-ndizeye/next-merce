import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"

const handler = nc()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const { page } = req.body
    const products = await Product.find().sort({ _id: 1 }).skip(page).limit(9)
    await db.disconnect()
    res.send(products)
  } catch (err) {
    console.error(err)
    res.status(500).send(getError(err))
  }
})

export default handler
