import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import { useSnackbar } from "notistack"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import {
  Avatar,
  Typography,
  List,
  ListItem,
  Button,
  Link,
  Grid,
} from "@material-ui/core"
import { pink } from "@material-ui/core/colors"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Layout from "../../components/Layout"
import useStyles from "../../utils/styles"
import { getError } from "../../utils/error"

function ForgotPassword() {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const classes = useStyles()

  const submitHandler = async ({ email }) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.post("/api/forgot-password", { email })
      router.push("/login")
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(
        "Please check your email to reset your account password",
        { variant: "success" }
      )
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }
  return (
    <Layout title="Forgot Password?">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.form}
        autoComplete="off"
      >
        <div className={classes.paper}>
          <Avatar
            style={{
              textAlign: "center",
              margin: 3,
              backgroundColor: pink[100],
              color: "white",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Forgot Password?
          </Typography>
        </div>
        <List>
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
                  label="Please Enter your Email"
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Submit
            </Button>
          </ListItem>
          <ListItem>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <NextLink
                  href={`/login?redirect=${router.query.redirect || "/"}`}
                  passHref
                >
                  <Link>Return back to login page?</Link>
                </NextLink>
              </Grid>
              <Grid item sm={6} xs={12}>
                Don't have an account? &nbsp;
                <NextLink
                  href={`/register?redirect=${router.query.redirect || "/"}`}
                  passHref
                >
                  <Link>Register</Link>
                </NextLink>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(ForgotPassword), { ssr: false })
