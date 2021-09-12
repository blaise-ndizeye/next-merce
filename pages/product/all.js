import React from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import axios from "axios"
import useStyles from "../../utils/styles"
import { Store } from "../../utils/Store"
import Products from "../../components/Products"

export default function ProductScreen(props) {
  const { dispatch, state } = React.useContext(Store)
  const [products, setProducts] = React.useState([])
  React.useEffect(async () => {
    dispatch({ type: "OPEN_LOADER" })
    const { data } = await axios.post("/api/products", { page: 0 })
    setProducts(data)
    dispatch({ type: "CLOSE_LOADER" })
  }, [])
  return (
    <Layout title="All products" description="Product list in next-commerce">
      <Products
        products={products}
        title="All Products (#For quick search please click in the searchbox above)"
      />
    </Layout>
  )
}
