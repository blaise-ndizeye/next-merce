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

export default function DeleteOrderDialog({ order }) {
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

  const deleteOrderHandler = async (orderId) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      handleClose()
      await axios.delete(`/api/orders/${orderId}/delete`, {
        headers: {
          authorization: `Bearer ${state.userInfo.token}`,
        },
      })
      handleClose()
      dispatch({ type: "CLOSE_LOADER" })
      dispatch({ type: "RELOAD_DATA" })
      enqueueSnackbar("Order deleted successfully", { variant: "success" })
    } catch (err) {
      handleClose()
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <>
      <Button
        type="button"
        startIcon={<DeleteIcon />}
        className={classes.cardDeleteButton}
        onClick={handleClickOpen}
        style={{ marginLeft: 7 }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete order: ${order._id}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete this order you will not be able to see it again
            unless you look for products placed in this order and then do it
            again to appear in this order history
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button
            onClick={() => deleteOrderHandler(order._id)}
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
