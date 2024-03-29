import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: String, required: true, default: 0 },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
)
productSchema.index({ "$**": "text" })
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
