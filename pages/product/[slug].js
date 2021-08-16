import React from "react"
import NextLink from "next/link"
import Image from "next/image"
import data from "../../utils/data"
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
import useStyles from "../../utils/styles"

export default function ProductScreen({ params }) {
  const classes = useStyles()
  const product = data.products.find((product) => product?.slug === params.slug)
  if (!product) return null
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

export function getServerSideProps(ctx) {
  return {
    props: {
      params: ctx.params,
    },
  }
}
