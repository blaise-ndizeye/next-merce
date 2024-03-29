import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import Cookies from "js-cookie"
import {
  FormControl,
  List,
  ListItem,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { useRouter } from "next/router"
import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"

function Payment() {
  const router = useRouter()
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [paymentMethod, setPaymentMethod] = React.useState("")
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  React.useEffect(() => {
    if (!state.userInfo) return router.push("/")
    if (!state.cart.shippingAddress.address) return router.push("/shipping")
    if (state.appLoader) dispatch({ type: "CLOSE_LOADER" })
    setPaymentMethod(Cookies.get("paymentMethod") || "")
  }, [])

  const submitHandler = (e) => {
    closeSnackbar()
    dispatch({ type: "OPEN_LOADER" })
    e.preventDefault()
    if (!paymentMethod) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar("Payment method is required", { variant: "error" })
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod })
    router.push("/placeorder")
    if (router.pathname === "/placeorder")
      return dispatch({ type: "CLOSE_LOADER" })
  }
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography className={classes.title}>Payment Method</Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio color="primary" />}
                />
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio disabled color="primary" />}
                />
                <FormControlLabel
                  label="MTN"
                  value="MTN"
                  control={<Radio disabled color="primary" />}
                />
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio disabled color="primary" />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push("/shipping")}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Payment), { ssr: false })
