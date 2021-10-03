import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import NextLink from "next/link"
import dynamic from "next/dynamic"
import { Grid, Typography, Divider, Button } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import FindInPageIcon from "@material-ui/icons/FindInPage"
import useStyles from "../utils/styles"
import Layout from "../components/Layout"
import db from "../utils/db"
import Product from "../models/Product"
import ProductCard from "../components/ProductCard"
import SkeletonList from "../components/SkeletonList"
import HomeCard from "../components/HomeCard"
import { useSnackbar } from "notistack"
import { getError } from "/utils/error"
import HomeSellingCard from "../components/HomeSellingCard"

function Home(props) {
  const classes = useStyles()
  const [products, setProducts] = React.useState([])
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(async () => {
    closeSnackbar()
    if (!props.products) return dispatch({ type: "OPEN_LOADER" })
    setProducts(props.products)
    dispatch({ type: "CLOSE_LOADER" })
  }, [])

  React.useEffect(async () => {
    try {
      const { data } = await axios.post("/api/products", {
        page: 0,
        limit: 6,
        sort: -1,
      })
      if (data.length === 0) return null
      setProducts(data)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }, [state.reloadData])

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
        <HomeSellingCard />
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignContent="center"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item md={4} sm={6} xs={12} key={product.name}>
                <ProductCard
                  hideActions={
                    state.userInfo && state.userInfo.isAdmin ? true : false
                  }
                  product={product}
                />
              </Grid>
            ))
          ) : (
            <SkeletonList />
          )}
        </Grid>
        <Divider style={{ marginTop: 10 }} />
        <NextLink href={`/product/all`} passHref>
          <Button
            className={classes.anotherPageLink}
            startIcon={
              state.userInfo && state.userInfo.isAdmin ? (
                <SettingsIcon />
              ) : (
                <FindInPageIcon />
              )
            }
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

export async function getStaticProps() {
  await db.connect()
  const products = await Product.find().sort({ _id: -1 }).limit(6).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map((product) => db.convertDocToObj(product)),
    },
  }
}
