import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import NextImage from "next/image"
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core"
import { pink, red, purple, grey } from "@material-ui/core/colors"
import { Rating } from "@material-ui/lab"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import axios from "axios"
import { useSnackbar } from "notistack"
import useStyles from "../utils/styles"
import { imageLoader } from "/utils/constants"
import { useRouter } from "next/router"
import DeleteProductDialog from "/components/DeleteProductDialog"
import EditProductDialog from "./EditProductDialog"
import { getError } from "../utils/error"

function ProductCard({ product, hideActions }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const addToCartHandler = async (product) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.get(`/api/products/${product._id}`)
      const existItem = state.cart.cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1 : 1
      if (data.countInStock < quantity) {
        dispatch({ type: "CLOSE_LOADER" })
        return enqueueSnackbar("Sorry! Product is out of stock", {
          variant: "error",
        })
      }
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
      router.push("/cart")
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <Card>
      <CardHeader
        title={product.name}
        component="h2"
        avatar={
          <Avatar style={{ backgroundColor: purple[600], color: "white" }}>
            {product.brand.charAt(0).toUpperCase()}
          </Avatar>
        }
        subheader={product.brand}
      />
      <NextLink href={`/product/${product._id}`} passHref>
        <CardActionArea>
          <NextImage
            src={product.image}
            width={400}
            height={400}
            alt={product.name}
            layout="responsive"
            loader={() => imageLoader(product.image)}
          />
        </CardActionArea>
      </NextLink>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Rating name="ratingForProduct" value={+product.rating} />
          </Grid>
          <Grid item xs={6}>
            <Card style={{ textAlign: "center", backgroundColor: purple[50] }}>
              <Typography style={{ color: purple[900], padding: 10 }}>
                <strong>Price:</strong> &nbsp; &nbsp;${product.price}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      {!hideActions && (
        <CardActions>
          {state.userInfo && state.userInfo.isAdmin ? (
            <Grid container>
              <Grid item xs={6} align="left">
                <EditProductDialog product={product} />
              </Grid>
              <Grid item xs={6} align="right">
                <DeleteProductDialog type="card" product={product} />
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  size="small"
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="card"
                  className={classes.cartAddButton}
                  onClick={() => addToCartHandler(product)}
                >
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          )}
        </CardActions>
      )}
    </Card>
  )
}

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false })
