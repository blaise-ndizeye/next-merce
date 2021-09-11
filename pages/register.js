import React from "react"
import axios from "axios"
import NextLink from "next/link"
import { useSnackbar } from "notistack"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import { Typography, List, ListItem, Button, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"
import { getError } from "../utils/error"

export default function Register() {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { dispatch, state } = React.useContext(Store)
  const classes = useStyles()
  React.useEffect(() => {
    if (state.userInfo) {
      router.push("/")
    }
  }, [])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar()
    if (password !== confirmPassword)
      return enqueueSnackbar("Passwords don't match", { variant: "error" })

    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      })
      dispatch({ type: "USER_LOGIN", payload: data })
      router.push(router.query.redirect || "/")
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar("Registering successfull", { variant: "success" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }
  return (
    <Layout title="Register">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.form}
        autoComplete="off"
      >
        <Typography className={classes.title}>Register</Typography>
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
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length must be at least 6"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "minLength"
                        ? "Confirm Password length must be at least 6"
                        : "Confirm Password is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink
              href={`/login?redirect=${router.query.redirect || "/"}`}
              passHref
            >
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
