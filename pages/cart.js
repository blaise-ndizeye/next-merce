import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
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
import ErrorCard from "../components/ErrorCard"
import { Store } from "../utils/Store"
import SearchScreenTitle from "../components/SearchScreenTitle"
import { getError } from "../utils/error"

function Cart() {
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const checkoutHandler = () => {
    dispatch({ type: "OPEN_LOADER" })
    router.push("/shipping")
    if (router.pathname === "/shipping")
      return dispatch({ type: "CLOSE_LOADER" })
  }

  const updateCartHandler = async (item, quantity) => {
    closeSnackbar()
    try {
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
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
  }

  return (
    <Layout title="Shopping Cart">
      <SearchScreenTitle
        title="Cart:"
        keyword="Products you want to buy"
        dataLength={state.cart.cartItems.length}
        showLink={true}
        link="/product/all"
        linkName="Find More..."
      />
      {state.cart.cartItems.length === 0 ? (
        <ErrorCard
          title="No more products found:"
          keyword="In cart"
          description="No product added in your basket please navigate to products page to add more by clicking the button below"
          redirectLink="/product/all"
          redirectName="Go Shopping"
        />
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
                              placeholder="blur"
                              blurDataURL="/images/homeCardImage.jpg"
                              className={classes.nextImage}
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
                      <TableCell align="right">FRW {item.price}</TableCell>
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
                    items) : FRW
                    {state.cart.cartItems.reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                <ListItem>
                  <NextLink href="/product/all">
                    <Button className={classes.cartContinueBtn} fullWidth>
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
