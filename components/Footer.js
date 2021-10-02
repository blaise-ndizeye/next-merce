import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import axios from "axios"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useForm, Controller } from "react-hook-form"
import {
  Badge,
  Button,
  Typography,
  Grid,
  TextField,
  Card,
  List,
  ListItem,
  Link,
  CircularProgress,
  Divider,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"
import LogoutDialog from "./LogoutDialog"
import { categories } from "/utils/constants"
import { getError } from "../utils/error"

function Footer() {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [loading, setLoading] = React.useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const submitHandler = async ({ name, email, comment }) => {
    try {
      closeSnackbar()
      setLoading(true)
      console.log(name, email, comment)
      if (!state.userInfo) {
        setValue("name", "")
        setValue("email", "")
      }
      setTimeout(() => {
        setLoading(false)
        setValue("comment", "")
        enqueueSnackbar("Comment submitted successfully", {
          variant: "success",
        })
      }, 2000)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  const handleSearchCategory = async (category) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.get(
        `/api/products/search?search=${category}`
      )
      dispatch({ type: "SEARCH_PRODUCT_RESULT", payload: data })
      router.push(`/search/product/${category}`)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  React.useEffect(() => {
    if (state.userInfo) {
      setValue("name", state.userInfo.name)
      setValue("email", state.userInfo.email)
    } else {
      setValue("name", "")
      setValue("email", "")
    }
  }, [state.userInfo])

  return (
    <footer className={classes.footer}>
      <Alert severity="info">
        PayPal is the only payment system implemented now other alternatives are
        still under development!
      </Alert>
      <Divider />
      <Card style={{ backgroundColor: "#3D4849", color: "white" }}>
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          spacing={2}
        >
          <Grid item xs={12} md={3}>
            <Typography
              component="p"
              color="inherit"
              className={classes.footerParagraph}
            >
              <i>
                There are many categories of products in this e-commerce
                platform if you want to find the product using the categories
                you can click the links below:
              </i>
            </Typography>
            <List>
              <Grid container>
                {categories.map((item, index) => (
                  <Grid key={index} item xs={6}>
                    <ListItem>
                      <Button
                        onClick={() => handleSearchCategory(item)}
                        color="secondary"
                        fullWidth
                      >
                        {item}
                      </Button>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className={classes.form}
              autoComplete="off"
            >
              <Typography
                component="p"
                color="inherit"
                className={classes.footerParagraph}
              >
                <i>
                  {state.userInfo ? state.userInfo.name + ", for" : "For"} any
                  idea or any other comment on this platform please submit a
                  comment by filling the form below:
                </i>
              </Typography>
              <Divider />
              <List>
                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 3,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="name"
                        name="name"
                        label="Name"
                        color="secondary"
                        inputProps={{ type: "name" }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Name length must be at least 3"
                              : "Name is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="email"
                        name="email"
                        label="Email"
                        color="secondary"
                        inputProps={{ type: "email" }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === "pattern"
                              ? "Email is not valid"
                              : "Email is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    name="comment"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 5,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="comment"
                        name="comment"
                        label="Comment"
                        color="secondary"
                        inputProps={{ type: "text" }}
                        error={Boolean(errors.comment)}
                        helperText={
                          errors.comment
                            ? errors.comment.type === "minLength"
                              ? "Comment length must be at least 5"
                              : "Comment is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="secondary"
                  >
                    {loading ? <CircularProgress color="primary" /> : "Submit"}
                  </Button>
                </ListItem>
              </List>
            </form>
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem>
                <Typography component="p" color="inherit">
                  <i>
                    By this platform you can find products of any kind in short
                    time and if you don't understand well how the platform works
                    please visit the{" "}
                    <strong className={classes.active}>About page</strong>.
                  </i>
                </Typography>
              </ListItem>
              <Divider />
              <Grid container>
                <Grid item xs={6}>
                  {state.userInfo && state.userInfo.isAdmin ? (
                    ""
                  ) : (
                    <ListItem>
                      <NextLink href="/cart" passHref>
                        {state.cart.cartItems.length > 0 ? (
                          <Badge
                            color="secondary"
                            badgeContent={state.cart.cartItems.length}
                          >
                            <Button color="secondary" fullWidth>
                              Cart
                            </Button>
                          </Badge>
                        ) : (
                          <Button color="secondary" fullWidth>
                            Cart
                          </Button>
                        )}
                      </NextLink>
                    </ListItem>
                  )}
                </Grid>
                <Grid
                  item
                  xs={state.userInfo && state.userInfo.isAdmin ? 12 : 6}
                >
                  <ListItem>
                    <NextLink href="/about" passHref>
                      <Button color="secondary" fullWidth>
                        About
                      </Button>
                    </NextLink>
                  </ListItem>
                </Grid>
              </Grid>
              {state.userInfo ? (
                <>
                  <ListItem>
                    <NextLink href="/profile" passHref>
                      <Button color="secondary" fullWidth>
                        Profile
                      </Button>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink href="/order-history" passHref>
                      <Button color="secondary" fullWidth>
                        Order History
                      </Button>
                    </NextLink>
                  </ListItem>
                  <LogoutDialog
                    type="listItem"
                    logoutClickHandler={() => dispatch({ type: "USER_LOGOUT" })}
                  />
                </>
              ) : (
                <>
                  <ListItem>
                    <NextLink href="/login" passHref>
                      <Button color="secondary" fullWidth>
                        Login
                      </Button>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink href="/register" passHref>
                      <Button color="secondary" fullWidth>
                        Register
                      </Button>
                    </NextLink>
                  </ListItem>
                </>
              )}
              <ListItem>
                <NextLink href="/" passHref>
                  <Button color="secondary" fullWidth>
                    Home
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography className={classes.footerParagraph}>
              NEXT COMMERCE
            </Typography>
            <List>
              <Grid container>
                <Grid item xs={12}>
                  <ListItem>Contact Us:</ListItem>
                </Grid>
                <Grid item xs={5}>
                  <ListItem>Email:</ListItem>
                </Grid>
                <Grid item xs={7}>
                  nextcommerce@gmail.com
                </Grid>
                <Grid item xs={6}>
                  <ListItem>Phone:</ListItem>
                </Grid>
                <Grid item xs={6}>
                  +250 7827 65738
                </Grid>
                <Grid item xs={12}>
                  <ListItem>Developer:</ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem>Email:</ListItem>
                </Grid>
                <Grid item xs={6}>
                  blaiseonnet@gmail.com
                </Grid>
                <Grid item xs={6}>
                  <ListItem>Phone:</ListItem>
                </Grid>
                <Grid item xs={6}>
                  +250 7876 57134
                </Grid>
              </Grid>
            </List>
          </Grid>
        </Grid>
        <Divider />
        <p>All rights reserved &copy; copyrigth Next Commerce</p>
      </Card>
    </footer>
  )
}

export default dynamic(() => Promise.resolve(Footer), { ssr: false })
