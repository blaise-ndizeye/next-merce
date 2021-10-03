import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import axios from "axios"
import { useSnackbar } from "notistack"
import { Button, Grid, Link, Divider, Typography } from "@material-ui/core"
import NotificationsIcon from "@material-ui/icons/Notifications"
import useStyles from "../utils/styles"
import ProductCard from "./ProductCard"
import ProductSections from "/components/ProductSections"
import { getError } from "../utils/error"
import ErrorCard from "./ErrorCard"
import SearchScreenTitle from "./SearchScreenTitle"
import HomeSellingCard from "./HomeSellingCard"

function Products({ products, title, type, keyword }) {
  const classes = useStyles()
  const [pageLength, setPageLength] = React.useState(9)
  const [paginatedProducts, setPaginatedProducts] = React.useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  return (
    <div>
      {type !== "all" ? (
        <>
          <SearchScreenTitle
            title={title}
            keyword={keyword}
            dataLength={products.length}
            showLink={true}
            link="/product/all"
            linkName="Find More..."
          />
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
        </>
      ) : (
        <>
          <Typography className={classes.productTitle}>
            <b className={classes.keyword}>{title}</b> &nbsp;&nbsp;
            <NotificationsIcon />
            &nbsp;{keyword}
          </Typography>
          <Divider style={{ marginBottom: 10 }} />
          <HomeSellingCard />
          <ProductSections products={products} />
        </>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })
