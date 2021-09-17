import React from "react"
import NextLink from "next/link"
import dynamic from "next/dynamic"
import { Grid, Typography, Slide, Divider, Button } from "@material-ui/core"
import useStyles from "../utils/styles"
import Layout from "../components/Layout"
import db from "../utils/db"
import Product from "../models/Product"
import ProductCard from "../components/ProductCard"
import HomeCard from "../components/HomeCard"
import { Store } from "../utils/Store"

function Home(props) {
  const { products } = props
  const classes = useStyles()
  const { state } = React.useContext(Store)

  React.useEffect(async () => {}, [state.reloadData])

  return (
    <Layout>
      <div>
        <Divider />
        <Typography className={classes.tagLine}>
          EXPRESS YOUR DESIRES BY BUYING WHAT YOU WANT
        </Typography>
        <Divider />
        <HomeCard products={products} />
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
                <ProductCard
                  hideActions={
                    state.userInfo && state.userInfo.isAdmin ? true : false
                  }
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Slide>
        <Divider style={{ marginTop: 10 }} />
        <NextLink href="/product/all" passHref>
          <Button
            className={classes.anotherPageLink}
            color="primary"
            variant="contained"
            fullWidth
          >
            {state.userInfo && state.userInfo.isAdmin
              ? "Manage your products"
              : "Find more products"}
          </Button>
        </NextLink>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })

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
