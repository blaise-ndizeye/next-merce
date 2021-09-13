import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const products = await Product.find().sort({ _id: -1 })
    await db.disconnect()
    res.send(products)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
