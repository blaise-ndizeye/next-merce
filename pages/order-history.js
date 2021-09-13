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
import SearchScreenTitle from "../components/SearchScreenTitle"
import ErrorCard from "../components/ErrorCard"

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
      <SearchScreenTitle
        title="Order History:"
        keyword="All orders, paid and unpaid"
        dataLength={orders.length}
        showLink={false}
      />

      <List>
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
      </List>
      {orders.length === 0 && (
        <ErrorCard
          title="No order history found: "
          keyword="Buy to place one"
          description="It seems that you haven't performed any action of buying please click the button below to buy a poduct and have something in order history"
          redirectLink="/product/all"
          redirectName="Go Shopping"
        />
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })
