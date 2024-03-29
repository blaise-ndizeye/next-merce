import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
  } catch (err) {
    res.status(500).send(getError(err))
  }
})

export default handler
