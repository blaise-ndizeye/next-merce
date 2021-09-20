import React from "react"
import Layout from "/components/Layout"
import axios from "axios"
import db from "/utils/db"
import Product from "/models/Product"
import { useSnackbar } from "notistack"
import { Store } from "/utils/Store"
import Products from "/components/Products"
import { getError } from "/utils/error"

export default function ProductScreen(props) {
  const { dispatch, state } = React.useContext(Store)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [products, setProducts] = React.useState([])

  React.useEffect(async () => {
    closeSnackbar()
    if (!props.products) return dispatch({ type: "OPEN_LOADER" })
    setProducts(props.products)
    dispatch({ type: "CLOSE_LOADER" })
  }, [])

  React.useEffect(async () => {
    closeSnackbar()
    try {
      const { data } = await axios.post("/api/products", { page: 0 })
      if (data.length === 0) return null
      setProducts(data)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }, [state.reloadData])

  return (
    <Layout title="All products" description="Product list in Next-Commerce">
      <Products
        products={products}
        type="all"
        title="All Products on market"
        keyword="For quick search please click in the search box above"
      />
    </Layout>
  )
}

export async function getStaticProps() {
  await db.connect()
  const products = await Product.find().sort({ _id: 1 }).limit(9).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map((product) => db.convertDocToObj(product)),
    },
  }
}
