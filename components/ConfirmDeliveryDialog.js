import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useRouter } from "next/router"
import { ListItem } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import { useSnackbar } from "notistack"
import { Store } from "../utils/Store"
import useStyles from "/utils/styles"
import { getError } from "../utils/error"

export default function ConfirmDeliveryDialog({ order }) {
  const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const confirmDeliveryHandler = async (orderId) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      handleClose()
      await axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        {
          headers: {
            authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      )
      enqueueSnackbar("Delivery confirmed successfully", { variant: "success" })
      router.push(`/order/${order._id}`)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <>
      <Button onClick={handleClickOpen} color="primary">
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to confirm the delivery of product: ${order._id}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once the delivery of the product(s) mentioned in the order is
            confirmed you will be able to delete the order
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button
            onClick={() => confirmDeliveryHandler(order._id)}
            color="primary"
            variant="contained"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
