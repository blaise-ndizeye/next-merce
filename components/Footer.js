import React from "react"
import NextLink from "next/link"
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
} from "@material-ui/core"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"

export default function Footer() {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(Store)
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
      <Card>
        <Grid container justifyContent="center" alignContent="center">
          <Grid item xs={12} md={9}>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className={classes.form}
              autoComplete="off"
            >
              <Typography
                component="p"
                color="secondary"
                className={classes.footerFormTitle}
              >
                {state.userInfo ? state.userInfo.name + ", for" : "For"} any
                idea or any other comment on this platform please submit a
                comment by filling the form below
              </Typography>
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
                        label="Name"
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
                        label="Email"
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
                        label="Comment"
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
                    color="primary"
                  >
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </ListItem>
              </List>
            </form>
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem>
                <NextLink href="/cart" passHref>
                  {state.cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={state.cart.cartItems.length}
                    >
                      <Link>Cart</Link>
                    </Badge>
                  ) : (
                    <Link>Cart</Link>
                  )}
                </NextLink>
              </ListItem>
              <ListItem>
                <NextLink href="/about" passHref>
                  <Link>About</Link>
                </NextLink>
              </ListItem>
              {state.userInfo ? (
                <>
                  <ListItem>
                    <NextLink href="/profile" passHref>
                      <Link>Profile</Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink href="/order-history" passHref>
                      <Link>Order History</Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <Link
                      className={classes.muiLink}
                      onClick={() => dispatch({ type: "USER_LOGOUT" })}
                    >
                      Logout
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>
                    <NextLink href="/login" passHref>
                      <Link>Login</Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink href="/register" passHref>
                      <Link>Register</Link>
                    </NextLink>
                  </ListItem>
                </>
              )}
              <ListItem>
                <Typography component="p" color="secondary">
                  <i>
                    By this platform you can find products of any kind in short
                    time and if you don't understand well how the platform works
                    please visit the <strong>About page</strong>
                  </i>
                </Typography>
              </ListItem>
              <ListItem>
                <NextLink href="/" passHref>
                  <Link className={classes.title}>Next Commerce</Link>
                </NextLink>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <p>All rights reserved &copy; copyrigth Next Commerce</p>
      </Card>
    </footer>
  )
}
