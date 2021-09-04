import React from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import {
  Button,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Card,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { Layout } from "../components/Layout"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"
import CheckoutWizard from "../components/CheckoutWizard"
import { getError } from "../utils/error"

function PlaceOrder() {
  const router = useRouter()
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state, dispatch } = React.useContext(Store)
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state

  const roundTo2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = roundTo2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  )
  const shippingPrice = itemsPrice > 200 ? 0 : 15
  const taxPrice = roundTo2(itemsPrice * 0.15)
  const totalPrice = roundTo2(itemsPrice + shippingPrice + taxPrice)

  React.useEffect(() => {
    if (!state.userInfo) return router.push("/")
    if (!paymentMethod) return router.push("/payment")
    if (cartItems.length === 0) return router.push("/cart")
    if (state.appLoader) dispatch({ type: "CLOSE_LOADER" })
  }, [])

  const placeOrderHandler = async () => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      setLoading(true)
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      dispatch({ type: "CART_CLEAR" })
      setLoading(false)
      router.push(`/order/${data._id}`)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      setLoading(false)
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <Typography className={classes.title}>Place Order</Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.City}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.cart.cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={placeOrderHandler}
                >
                  {loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
