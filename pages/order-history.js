import React from "react"
import axios from "axios"
import moment from "moment"
import dynamic from "next/dynamic"
import NextLink from "next/link"
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
  Card,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { Store } from "../utils/Store"
import { getError } from "../utils/error"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"

function OrderHistory() {
  const [orders, setOrders] = React.useState([])
  const { state, dispatch } = React.useContext(Store)
  const router = useRouter()
  const classes = useStyles()
  const { userInfo } = state
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (!userInfo) return router.push("/")

    const fetchOrders = async () => {
      closeSnackbar()
      try {
        dispatch({ type: "OPEN_LOADER" })
        const { data } = await axios.get(`/api/orders/history`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        })
        setOrders(data)
        dispatch({ type: "CLOSE_LOADER" })
      } catch (err) {
        dispatch({ type: "CLOSE_LOADER" })
        enqueueSnackbar(getError(err), { variant: "error" })
      }
    }

    fetchOrders()
  }, [])

  return (
    <Layout title="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile" />
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Order history" />
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography className={classes.title}>Order History</Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>DATE</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>PAID</TableCell>
                        <TableCell>DELIVERED</TableCell>
                        <TableCell>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>
                            {moment(order.createdAt).format("LLLL")}
                          </TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell>
                            {order.isPaid ? (
                              <p style={{ color: "green" }}>
                                Paid at&nbsp;
                                {moment(order.paidAt).format("LLLL")}
                              </p>
                            ) : (
                              <p style={{ color: "red" }}>not paid</p>
                            )}
                          </TableCell>
                          <TableCell>
                            {order.isDelivered ? (
                              <p style={{ color: "green" }}>
                                Delivered at&nbsp;
                                {moment(order.deliveredAt).format("LLLL")}
                              </p>
                            ) : (
                              <p style={{ color: "red" }}>not delivered</p>
                            )}
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Button variant="contained" color="secondary">
                                Details
                              </Button>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
              <ListItem>
                {orders.length === 0 && (
                  <Typography className={classes.error}>
                    No order history found
                  </Typography>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })
