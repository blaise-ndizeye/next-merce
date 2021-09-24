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
        <SearchScreenTitle
          title={title}
          keyword={keyword}
          dataLength={products.length}
          showLink={true}
          link="/product/all"
          linkName="Find More..."
        />
      ) : (
        <>
          <Typography className={classes.productTitle}>
            <b className={classes.keyword}>{title}</b> &nbsp;&nbsp;
            <NotificationsIcon />
            &nbsp;{keyword}
          </Typography>
          <Divider style={{ marginBottom: 10 }} />
        </>
      )}
      <ProductSections products={products} />
    </div>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })
