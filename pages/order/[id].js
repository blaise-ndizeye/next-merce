import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import moment from "moment"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import {
  Button,
  Typography,
  Grid,
  Divider,
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
  LinearProgress,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import Layout from "../../components/Layout"
import { Store } from "../../utils/Store"
import useStyles from "../../utils/styles"
import { getError } from "../../utils/error"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import ErrorCard from "../../components/ErrorCard"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "PAY_REQUEST":
      return { ...state, loadingPay: true }
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true }
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload }
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" }
    default:
      return state
  }
}

function Order({ params }) {
  const orderId = params.id
  const router = useRouter()
  const classes = useStyles()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const globalDispatch = useDispatch()
  const state = useSelector((state) => state)
  const { userInfo } = state

  const [{ loading, error, order, successPay }, dispatch] = React.useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: "",
    }
  )

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order

  React.useEffect(() => {
    if (!userInfo) return router.push("/login")
    const fetchOrder = async () => {
      try {
        globalDispatch({ type: "OPEN_LOADER" })
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        })
        dispatch({ type: "FETCH_SUCCESS", payload: data })
        globalDispatch({ type: "CLOSE_LOADER" })
      } catch (err) {
        globalDispatch({ type: "CLOSE_LOADER" })
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()
      dispatch({ type: "PAY_RESET" })
    }
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/keys/paypal", {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      })
      paypalDispatch({ type: "setLoadingStatus", value: "pending" })
    }
    loadPaypalScript()
  }, [order, successPay])

  const goToHomeHandler = async () => {
    await router.push("/")
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId) => orderId)
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: "PAY_REQUEST" })
        globalDispatch({ type: "OPEN_LOADER" })
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        )
        dispatch({ type: "PAY_SUCCESS", payload: data })
        globalDispatch({ type: "CLOSE_LOADER" })
        enqueueSnackbar("Order is paid", { variant: "success" })
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) })
        globalDispatch({ type: "CLOSE_LOADER" })
        enqueueSnackbar(getError(err), { variant: "error" })
      }
    })
  }

  const onError = (err) => {
    enqueueSnackbar(getError(err), { variant: "error" })
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography className={classes.productTitle}>
        Order: <b className={classes.keyword}>{orderId}</b> &nbsp;&nbsp;
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {loading ? (
        <div />
      ) : error ? (
        <ErrorCard
          title={error}
          keyword="Error"
          description="It seems that an error is bordering you from paying refresh the page if not check your network connectivity otherwise report the problem using the form in the footer"
          redirectLink="/order-history"
          redirectName="Go to Order history"
        />
      ) : (
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
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </ListItem>
                <ListItem>
                  Status:{" "}
                  {isDelivered ? (
                    <p style={{ color: "green" }}>
                      &nbsp;Delivered at {moment(deliveredAt).format("LLLL")}
                    </p>
                  ) : (
                    <p style={{ color: "red" }}>&nbsp;not delivered</p>
                  )}
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
                <ListItem>
                  Status:{" "}
                  {isPaid ? (
                    <p style={{ color: "green" }}>
                      &nbsp;Paid at {moment(paidAt).format("LLLL")}
                    </p>
                  ) : (
                    <p style={{ color: "red" }}>&nbsp;not paid</p>
                  )}
                </ListItem>
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
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item._id}`} passHref>
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
                              <NextLink href={`/product/${item._id}`} passHref>
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
                    className={classes.linkBtn}
                    onClick={goToHomeHandler}
                    fullWidth
                    color="primary"
                  >
                    Go to home
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={() => window.history.back()}
                    fullWidth
                    color="primary"
                    className={classes.linkBtn}
                  >
                    Go back
                  </Button>
                </ListItem>
                {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <LinearProgress color="secondary" />
                    ) : (
                      <div className={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false })
