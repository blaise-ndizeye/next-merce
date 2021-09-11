import React from "react"
import NextLink from "next/link"
import { Grid, Typography, Slide, Divider, Link } from "@material-ui/core"
import useStyles from "../utils/styles"
import { Layout } from "../components/Layout"
import db from "../utils/db"
import Product from "../models/Product"
import ProductCard from "../components/ProductCard"
import HomeCard from "../components/HomeCard"

export default function Home(props) {
  const { products } = props
  const classes = useStyles()
  return (
    <Layout>
      <div>
        <Divider />
        <Typography className={classes.tagLine}>
          EXPRESS YOUR DESIRES BY BUYING WHAT YOU WANT
        </Typography>
        <Divider />
        <HomeCard products={products} />
        <Typography className={classes.title}>
          Products (
          <i>
            <small>
              If you don't see the one you are looking for please search...
            </small>
          </i>
          )
        </Typography>
        <Divider style={{ marginBottom: 10 }} />
        <Slide direction="down" in={true}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
          >
            {products.map((product) => (
              <Grid item md={4} sm={6} xs={12} key={product.name}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Slide>
        <Divider style={{ marginTop: 10 }} />
        <NextLink href="/" passHref>
          <Link>
            <Typography className={classes.anotherPageLink}>
              FIND MORE PRODUCTS...
            </Typography>
          </Link>
        </NextLink>
        <Divider />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().sort({ _id: -1 }).limit(6).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map((product) => db.convertDocToObj(product)),
    },
  }
}
