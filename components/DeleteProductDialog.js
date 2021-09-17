import React from "react"
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

export default function DeleteProductDialog({ product, type }) {
  const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { dispatch, state } = React.useContext(Store)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteProductHandler = async (productId) => {
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      handleClose()
      await axios.post(
        "/api/products/delete",
        {
          productId,
        },
        {
          headers: {
            authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      )
      handleClose()
      router.push("/product/all")
      dispatch({ type: "CLOSE_LOADER" })
      dispatch({ type: "RELOAD_DATA" })
      enqueueSnackbar("Product deleted successfully", { variant: "success" })
    } catch (err) {
      handleClose()
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  return (
    <>
      {type === "card" && (
        <Button
          startIcon={<DeleteIcon />}
          className={classes.cardDeleteButton}
          size="small"
          onClick={handleClickOpen}
        >
          Delete the product
        </Button>
      )}
      {type === "details" && (
        <ListItem>
          <Button
            fullwidth
            type="button"
            startIcon={<DeleteIcon />}
            variant="contained"
            className={classes.cardDeleteButton}
            style={{ width: "100%" }}
            onClick={handleClickOpen}
          >
            Delete the product
          </Button>
        </ListItem>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete product: ${product.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete this product it will be removed from the market and
            orders lately paid to this product will not be remembered
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button
            onClick={() => deleteProductHandler(product._id)}
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
