import React from "react"
import NextLink from "next/link"
import Image from "next/image"
import db from "../../utils/db"
import { Layout } from "../../components/Layout"
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core"
import axios from "axios"
import useStyles from "../../utils/styles"
import Product from "../../models/Product"
import { Store } from "../../utils/Store"

export default function ProductScreen({ product }) {
  const { dispatch } = React.useContext(Store)
  const classes = useStyles()
  if (!product) return null
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock <= 0)
      return window.alert("Sorry. Product is out of stock...")
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } })
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>BACK TO PRODUCTS</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} sm={12}>
          <Image
            src={product?.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
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
                &nbsp; {product.rating} stars ({product.numReviews} reviews)
              </Typography>
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
                <Button
                  fullwidth="true"
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
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
