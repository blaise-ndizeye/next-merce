import React from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { useSnackbar } from "notistack"
import { Store } from "../../utils/Store"
import Products from "../../components/Products"
import { getError } from "../../utils/error"

export default function ProductScreen(props) {
  const { dispatch, state } = React.useContext(Store)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [products, setProducts] = React.useState([])

  React.useEffect(async () => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.post("/api/products", { page: 0 })
      setProducts(data)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
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
