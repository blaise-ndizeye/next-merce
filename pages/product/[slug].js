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
import { Rating } from "@material-ui/lab"
import axios from "axios"
import useStyles from "../../utils/styles"
import Product from "../../models/Product"
import { Store } from "../../utils/Store"
import EditProductDialog from "../../components/EditProductDialog"
import DeleteProductDialog from "../../components/DeleteProductDialog"

export default function ProductScreen({ product }) {
  const { dispatch, state } = React.useContext(Store)
  const router = useRouter()
  const classes = useStyles()
  if (!product) return null

  const addToCartHandler = async () => {
    dispatch({ type: "OPEN_LOADER" })
    const { data } = await axios.get(`/api/products/${product._id}`)
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (data.countInStock < quantity)
      return window.alert("Sorry. Product is out of stock...")
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
    router.push("/cart")
    dispatch({ type: "CLOSE_LOADER" })
  }
  return (
    <Layout title={product.name} description={product.description}>
      <Typography className={classes.title}>Product #{product._id}</Typography>
      <Divider />
      <Grid className={classes.section} container spacing={1}>
        <Grid item md={6} sm={12}>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: 300,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 10,
              }}
            />
          </div>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                &nbsp; {product.name.toUpperCase()}
              </Typography>
            </ListItem>
            <ListItem>
              Category: <Typography>&nbsp; {product.category}</Typography>
            </ListItem>
            <ListItem>
              Brand: <Typography>&nbsp; {product.brand}</Typography>
            </ListItem>
            <ListItem>
              Rating:{" "}
              <Typography>
                &nbsp; <Rating value={product.rating} />
              </Typography>
            </ListItem>
            <ListItem>
              Reviews: <Typography>&nbsp; {product.numReviews}</Typography>
            </ListItem>
            <ListItem>
              Description:
              <Typography>&nbsp; {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <NextLink href="/product/all" passHref>
                  <Button style={{ width: "100%" }} color="primary">
                    BACK TO PRODUCTS
                  </Button>
                </NextLink>
              </ListItem>
              {state.userInfo && state.userInfo.isAdmin ? (
                <>
                  <EditProductDialog type="details" product={product} />
                  <DeleteProductDialog type="details" product={product} />
                </>
              ) : (
                <ListItem>
                  <Button
                    fullwidth
                    type="button"
                    variant="contained"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  await db.connect()
  const product = await Product.findOne({ slug: params.slug }).lean()
  await db.disconnect()
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  }
}
