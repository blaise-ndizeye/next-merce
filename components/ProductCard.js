import React from "react"
import { useSelector, useDispatch } from "react-redux"
import NextLink from "next/link"
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
import { Rating } from "@material-ui/lab"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import axios from "axios"
import { useSnackbar } from "notistack"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"
import { useRouter } from "next/router"
import DeleteProductDialog from "/components/DeleteProductDialog"
import EditProductDialog from "./EditProductDialog"

export default function ProductCard({ product, hideActions }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const addToCartHandler = async (product) => {
    closeSnackbar()
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
  }

  return (
    <Card>
      <CardHeader
        title={product.name}
        component="h2"
        avatar={
          <Avatar className={classes.cardAvatar}>
            {product.brand.charAt(0).toUpperCase()}
          </Avatar>
        }
        subheader={product.brand}
      />
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
            className={classes.cardImg}
          ></CardMedia>
        </CardActionArea>
      </NextLink>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Rating name="ratingForProduct" value={+product.rating} />
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.cardPriceWrapper}>
              <Typography className={classes.cardPrice}>
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
              <Grid item xs={6}>
                <EditProductDialog product={product} />
              </Grid>
              <Grid item xs={6}>
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
