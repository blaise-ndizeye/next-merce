import React from "react"
import { Grid, Typography } from "@material-ui/core"
import useStyles from "../utils/styles"
import { Layout } from "../components/Layout"
import db from "../utils/db"
import Product from "../models/Product"
import ProductCard from "../components/ProductCard"

export default function Home(props) {
  const { products } = props
  const classes = useStyles()
  return (
    <Layout>
      <div>
        <Typography className={classes.title}>Products</Typography>
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
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().sort({ _id: -1 }).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map((product) => db.convertDocToObj(product)),
    },
  }
}
