import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import db from "../../utils/db"
import Layout from "../../components/Layout"
import {
  Grid,
  Divider,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core"
import axios from "axios"
import useStyles from "../../utils/styles"
import { Store } from "../../utils/Store"
import ProductCard from "../../components/ProductCard"

export default function ProductScreen(props) {
  const { dispatch } = React.useContext(Store)
  const [products, setProducts] = React.useState([])
  const productsToRender = props.products ? props.products : products
  const router = useRouter()
  const classes = useStyles()
  React.useEffect(async () => {
    dispatch({ type: "OPEN_LOADER" })
    const { data } = await axios.post("/api/products")
    setProducts(data)
    dispatch({ type: "CLOSE_LOADER" })
  }, [])
  return (
    <Layout title="All products" description="Product list in next-commerce">
      <Typography className={classes.title}>
        All Products (#For quick search please click in the searchbox above)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <Grid container spacing={3} justifyContent="center" alignContent="center">
        {productsToRender.map((product) => (
          <Grid item md={4} sm={6} xs={12} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
