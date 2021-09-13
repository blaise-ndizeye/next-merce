import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"
import { getError } from "../../../utils/error"

const handler = nc()

handler.get(async (req, res) => {
  try {
    await db.connect()
    const { search } = req.query
    // await db.products.createIndex({
    //   name: "text",
    //   description: "text",
    //   price: "text",
    //   brand: "text",
    //   category: "text",
    // })
    const products = await Product.find({ $text: { $search: search } }).sort({
      _id: 1,
    })
    await db.disconnect()
    res.send(products)
  } catch (err) {
    console.error(err)
    res.status(500).send(getError(err))
  }
})

export default handler
