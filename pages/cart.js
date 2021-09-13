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
  MenuItem,
  Select,
  Card,
  List,
  ListItem,
} from "@material-ui/core"
import useStyles from "../utils/styles"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"

function Cart() {
  const router = useRouter()
  const classes = useStyles()
  const { state, dispatch } = React.useContext(Store)

  const checkoutHandler = () => {
    dispatch({ type: "OPEN_LOADER" })
    router.push("/shipping")
    if (router.pathname === "/shipping")
      return dispatch({ type: "CLOSE_LOADER" })
  }

  const updateCartHandler = async (item, quantity) => {
    dispatch({ type: "OPEN_LOADER" })
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      dispatch({ type: "CLOSE_LOADER" })
      return enqueueSnackbar("Sorry! Product is out of stock", {
        variant: "error",
      })
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
    dispatch({ type: "CLOSE_LOADER" })
  }

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
  }

  return (
    <Layout title="Shopping Cart">
      <Typography className={classes.title}>Shopping Cart</Typography>
      {state.cart.cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            fontSize: "1.45rem",
            alignItems: "center",
          }}
        >
          Cart is empty.{" "}
          <NextLink href="/product/all">
            <Button color="primary" size="large">
              Go Shopping
            </Button>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
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
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal (
                    {state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {state.cart.cartItems.reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                <ListItem>
                  <NextLink href="/product/all">
                    <Button color="primary" fullWidth>
                      Continue Shopping
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkoutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })
