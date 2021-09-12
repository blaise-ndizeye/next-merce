import React from "react"
import dynamic from "next/dynamic"
import axios from "axios"
import { useSnackbar } from "notistack"
import { Button, Grid, Divider, Typography } from "@material-ui/core"
import useStyles from "../utils/styles"
import ProductCard from "./ProductCard"
import { Store } from "../utils/Store"
import { getError } from "../utils/error"

function Products({ products, title }) {
  const classes = useStyles()
  const [pageLength, setPageLength] = React.useState(9)
  const [paginatedProducts, setPaginatedProducts] = React.useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { dispatch } = React.useContext(Store)
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
      <Typography className={classes.title}>{title}</Typography>
      <Divider style={{ marginBottom: 10 }} />
      <Grid container spacing={3} justifyContent="center" alignContent="center">
        {productsToRender.map((product) => (
          <Grid item md={4} sm={6} xs={12} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
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
        ) : (
          <Typography className={classes.error}>
            No more products found!!
          </Typography>
        )}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })
