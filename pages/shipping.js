import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import { Typography, List, ListItem, Button } from "@material-ui/core"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"
import CheckoutWizard from "../components/CheckoutWizard"

function Shipping() {
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const {
    cart: { shippingAddress },
  } = state
  const classes = useStyles()
  React.useEffect(() => {
    if (!state.userInfo) {
      router.push("/login?redirect=/shipping")
    }
    if (state.userInfo && state.userInfo.isAdmin) return router.push("/")
    if (state.appLoader) dispatch({ type: "CLOSE_LOADER" })
    setValue("fullName", shippingAddress.fullName)
    setValue("address", shippingAddress.address)
    setValue("city", shippingAddress.city)
    setValue("postalCode", shippingAddress.postalCode)
    setValue("country", shippingAddress.country)
  }, [])

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({ type: "OPEN_LOADER" })
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    })
    router.push("/payment")
    if (router.pathName === "/payment")
      return dispatch({ type: "CLOSE_LOADER" })
  }
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.form}
        autoComplete="off"
      >
        <Typography className={classes.title}>Shipping Address</Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length must be at least 3"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length must be at least 4"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length must be at least 3"
                        : "City is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "minLength"
                        ? "Postal Code length must be at least 3"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country length must be at least 2"
                        : "Country is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false })
