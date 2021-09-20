import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useRouter } from "next/router"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useSnackbar } from "notistack"
import { Store } from "../utils/Store"

export default function DeleteAccountDialog() {
  const router = useRouter()
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

  const deleteAccountHandler = async () => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      handleClose()
      await axios.post(
        "/api/users/delete",
        { userId: state.userInfo._id },
        {
          headers: {
            authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      )
      dispatch({ type: "USER_LOGOUT" })
      router.push("/")
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <div>
      <Button
        style={{ marginTop: 10 }}
        color="primary"
        onClick={handleClickOpen}
        variant="contained"
        fullWidth
      >
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete your account all data will be lost and you will not
            be able to log in again unless you create a new account. The
            decision is up to you
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button
            variant="contained"
            onClick={deleteAccountHandler}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
