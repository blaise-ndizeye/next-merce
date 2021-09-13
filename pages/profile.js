import React from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import { useRouter } from "next/router"
import {
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  Divider,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { useForm, Controller } from "react-hook-form"
import { Store } from "../utils/Store"
import { getError } from "../utils/error"
import Layout from "../components/Layout"
import ErrorCard from "../components/ErrorCard"
import useStyles from "../utils/styles"

function Profile() {
  const { state, dispatch } = React.useContext(Store)
  const router = useRouter()
  const classes = useStyles()
  const { userInfo } = state

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar()
    if (password !== confirmPassword)
      return enqueueSnackbar("Passwords don't match", { variant: "error" })

    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      dispatch({ type: "USER_LOGIN", payload: data })
      enqueueSnackbar("Profile updated successfully", { variant: "success" })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  React.useEffect(() => {
    if (!userInfo) return router.push("/")
    setValue("name", userInfo.name)
    setValue("email", userInfo.email)
  }, [])

  return (
    <Layout title="Profile">
      <Typography className={classes.productTitle}>
        Profile:{" "}
        <b className={classes.keyword}>
          Edit or delete your account information
        </b>{" "}
      </Typography>
      <Divider />
      <ErrorCard
        title="Delete your account"
        keyword="Danger Zone"
        description="Once you delete your account all data will be lost and you will not be able to log in again unless you create a new account if yes click the button below"
        redirectLink="/"
        redirectName="I agree"
        danger={true}
      />
      <Divider style={{ marginTop: 10 }} />
      <Typography style={{ color: "lightblue" }} className={classes.title}>
        Edit your account information:
      </Typography>
      <List>
        <ListItem>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className={classes.form}
            autoComplete="off"
          >
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
                    validate: (value) =>
                      value === "" ||
                      value.length > 5 ||
                      "Password length is more than 5",
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
                          ? "Password length must be at least 6"
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
                    validate: (value) =>
                      value === "" ||
                      value.length > 5 ||
                      "Confirm Password length is more than 5",
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
                        errors.password
                          ? "Confirm Password length must be at least 6"
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
                  update
                </Button>
              </ListItem>
            </List>
          </form>
        </ListItem>
      </List>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })
