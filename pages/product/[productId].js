import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import NextImage from "next/image"
import { useRouter } from "next/router"
import db from "../../utils/db"
import Layout from "../../components/Layout"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import {
  Grid,
  Divider,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"
import { Rating } from "@material-ui/lab"
import axios from "axios"
import useStyles from "../../utils/styles"
import Product from "../../models/Product"
import EditProductDialog from "../../components/EditProductDialog"
import DeleteProductDialog from "../../components/DeleteProductDialog"
import { getError } from "../../utils/error"

function ProductScreen({ product }) {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const router = useRouter()
  const classes = useStyles()

  React.useEffect(() => {
    if (router.isFallback) return dispatch({ type: "OPEN_LOADER" })
    dispatch({ type: "CLOSE_LOADER" })
  }, [])

  const addToCartHandler = async () => {
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.get(`/api/products/${product._id}`)
      const existItem = state.cart.cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      if (data.countInStock < quantity)
        return enqueueSnackbar("Sorry the product is out of stock", {
          variant: "error",
        })
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
      router.push("/cart")
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }
  return (
    <Layout title={product.name} description={product.description}>
      <Typography
        style={{
          marginTop: 12,
          marginBottom: 10,
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        Product{" "}
        <span style={{ color: "lightblue", fontWeight: "bold" }}>
          #{product._id.substring(8, 24)}
        </span>
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <Grid className={classes.section} container spacing={1}>
        <Grid item md={4} sm={6} xs={12}>
          <NextImage
            src={product.image}
            width={400}
            height={400}
            alt={product.name}
            className={classes.nextImage}
            layout="responsive"
            placeholder="blur"
            blurDataURL="/images/homeCardImage.jpg"
          />
        </Grid>
        <Grid item md={5} sm={6} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                &nbsp; {product.name.toUpperCase()}
              </Typography>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Category:
                </Grid>
                <Grid item xs={6}>
                  <Typography>{product.category}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Brand:
                </Grid>
                <Grid item xs={6}>
                  <Typography>{product.brand}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Rating:
                </Grid>
                <Grid item xs={6}>
                  <Rating value={+product.rating} name="ratingForProduct" />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Reviews:
                </Grid>
                <Grid item xs={6}>
                  <Typography>{product.numReviews}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Description:
                </Grid>
                <Grid item xs={6}>
                  <Typography>{product.description}</Typography>
                </Grid>
              </Grid>
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
                    <Typography>FRW&nbsp;{product.price}</Typography>
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
                <Button
                  onClick={() => window.history.back()}
                  className={classes.linkBtn}
                  style={{
                    width: "100%",
                    color: blueGrey[900],
                    backgroundColor: blueGrey[50],
                  }}
                >
                  Go back
                </Button>
              </ListItem>
              {state.userInfo && state.userInfo.isAdmin ? (
                <>
                  <EditProductDialog type="details" product={product} />
                  <DeleteProductDialog type="details" product={product} />
                </>
              ) : (
                <ListItem>
                  <Button
                    startIcon={<ShoppingCartIcon />}
                    fullwidth
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.cartAddButton}
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

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false })

export async function getStaticPaths(ctx) {
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect()
  return {
    paths: products.map((product) => ({
      params: {
        productId: product._id.toString(),
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps(ctx) {
  const { params } = ctx
  await db.connect()
  const product = await Product.findOne({ _id: params.productId }).lean()
  await db.disconnect()
  if (!product._id)
    return {
      notFound: true,
    }
  return {
    props: {
      product: db.convertDocToObj(product),
    },
    revalidate: 1,
  }
}
