import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import Button from "@material-ui/core/Button"
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  ListItem,
} from "@material-ui/core"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import EditIcon from "@material-ui/icons/Edit"
import { useSnackbar } from "notistack"
import { categories } from "../utils/constants"
import { Store } from "../utils/Store"
import useStyles from "/utils/styles"
import { getError } from "../utils/error"
import { Alert } from "@material-ui/lab"

export default function EditProductDialog({ product, type }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [loading, setLoading] = React.useState(false)
  const [category, setCategory] = React.useState(product.category)
  const [brand, setBrand] = React.useState(product.brand)
  const [price, setPrice] = React.useState(product.price)
  const [rating, setRating] = React.useState(product.rating)
  const [reviews, setNumReviews] = React.useState(product.numReviews)
  const [countInStock, setCountInStock] = React.useState(product.countInStock)
  const [description, setDescription] = React.useState(product.description)
  const [name, setName] = React.useState(product.name)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      setLoading(true)
      await axios.put(
        "/api/products/edit",
        {
          newProduct: {
            productId: product._id,
            brand,
            name,
            numReviews: reviews,
            description,
            countInStock,
            rating,
            price,
            category,
          },
        },
        {
          headers: {
            authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      )
      setLoading(false)
      if (type === "details") {
        router.push(`/product/${product._id}`)
      } else {
        router.push("/product/all")
      }
      setOpen(false)
      dispatch({ type: "CLOSE_LOADER" })
      dispatch({ type: "RELOAD_DATA" })
      enqueueSnackbar("Product updated successfully", { variant: "success" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      setLoading(false)
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  React.useEffect(() => {
    if (!state.userInfo) return handleClose()
  })

  return (
    <div>
      {type === "details" ? (
        <ListItem>
          <Button
            fullwidth
            type="button"
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            startIcon={<EditIcon />}
            onClick={handleClickOpen}
          >
            Edit the product
          </Button>
        </ListItem>
      ) : (
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleClickOpen}
        >
          Edit Product
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit product:{" "}
          <strong style={{ color: "lightblue" }}>{product._id}</strong>
        </DialogTitle>
        <form onSubmit={submitHandler} autoComplete="off">
          <DialogContent>
            <DialogContentText>
              To edit your product, we recommend you to fill all fields you are
              about to edit if not let the field as it is
            </DialogContentText>
            {loading && (
              <Alert severity="info">
                Please wait until the product is updated...
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                fullWidth
                labelId="category"
                margin="dense"
                name="category"
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="brand"
              label="Brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="rating"
              label="Rating"
              type="number"
              value={rating}
              fullWidth
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="reviews"
              label="Reviews"
              type="number"
              value={reviews}
              onChange={(e) => setNumReviews(e.target.value)}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="countInStock"
              label="Count in Stock"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading ? true : false}
              variant="contained"
              onClick={handleClose}
              color="secondary"
            >
              Cancel
            </Button>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                onClick={submitHandler}
                color="primary"
              >
                Submit
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
