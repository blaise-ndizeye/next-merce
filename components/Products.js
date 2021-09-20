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
import { Store } from "../utils/Store"
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
  const productsToRender =
    paginatedProducts.length > 0 ? paginatedProducts : products

  const changePage = async (page, action) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.post("/api/products", { page })
      action === "next"
        ? setPageLength(pageLength + data.length)
        : setPageLength(
            pageLength > 9 && pageLength > 0
              ? pageLength - data.length
              : data.length
          )
      setPaginatedProducts(data)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <div>
      {type !== "all" ? (
        <SearchScreenTitle
          title={title}
          keyword={keyword}
          dataLength={productsToRender.length}
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

      <Grid container spacing={3} justifyContent="center" alignContent="center">
        {productsToRender.map((product) => (
          <Grid item md={4} sm={6} xs={12} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {type === "all" && (
        <div>
          {productsToRender.length > 0 ? (
            <>
              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <div className={classes.displayFlex}>
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  onClick={() =>
                    changePage(
                      pageLength > 9 && pageLength > 0 ? pageLength - 9 : 0,
                      "prev"
                    )
                  }
                >
                  Prev
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  onClick={() => changePage(pageLength, "next")}
                >
                  Next
                </Button>
              </div>
            </>
          ) : state.userInfo && state.userInfo.isAdmin ? (
            <ErrorCard
              title="No products found"
              keyword="Add Products to market"
              description="Please add more products to help the users to find more products from this site"
              redirectLink="/"
              redirectName="Go to Home"
            />
          ) : (
            <ErrorCard
              title="Site is loading data for you: "
              keyword="Please wait"
              description="Wait until the page finish to load data if not found we recommend refreshing the page or report the problem in the comment section"
              redirectLink="/"
              redirectName="Go to Home"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })
