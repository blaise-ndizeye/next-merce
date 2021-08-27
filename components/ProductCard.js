import React from "react"
import NextLink from "next/link"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@material-ui/core"
import axios from "axios"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"
import { useRouter } from "next/router"

export default function ProductCard({ product }) {
  const classes = useStyles()
  const { dispatch, state } = React.useContext(Store)
  const router = useRouter()

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (data.countInStock < quantity)
      return window.alert("Sorry. Product is out of stock...")
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
    router.push("/cart")
  }

  return (
    <Card>
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
        <Typography>{product.name}</Typography>
      </CardContent>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}
