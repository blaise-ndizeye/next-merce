import React from "react"
import { useSelector, useDispatch } from "react-redux"
import NextImage from "next/image"
import axios from "axios"
import Button from "@material-ui/core/Button"
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  ListItem,
  Grid,
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
  const [image, setImage] = React.useState(null)
  const [previewImage, setPreviewImage] = React.useState(product.image)
  const [category, setCategory] = React.useState(product.category)
  const [brand, setBrand] = React.useState(product.brand)
  const [price, setPrice] = React.useState(product.price)
  const [rating, setRating] = React.useState(product.rating)
  const [reviews, setNumReviews] = React.useState(product.numReviews)
  const [countInStock, setCountInStock] = React.useState(product.countInStock)
  const [description, setDescription] = React.useState(product.description)
  const [name, setName] = React.useState(product.name)

  const selectImage = (e) => {
    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

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

      const formData = new FormData()
      if (image) formData.append("image", image, image.name)
      formData.append("productId", product._id)
      formData.append("name", name)
      formData.append("brand", brand)
      formData.append("category", category)
      formData.append("price", price)
      formData.append("countInStock", countInStock)
      formData.append("numReviews", reviews)
      formData.append("rating", rating)
      formData.append("description", description)

      setLoading(true)
      await axios.put("/api/products/edit", formData, {
        headers: {
          authorization: `Bearer ${state.userInfo.token}`,
        },
      })
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
        <form
          onSubmit={submitHandler}
          className={classes.form}
          autoComplete="off"
        >
          <DialogContent>
            <DialogContentText>
              To edit your product, we recommend you to fill all fields you are
              about to edit if not let the field as it is
            </DialogContentText>
            {loading && (
              <Alert style={{ marginBottom: 10 }} severity="info">
                Please wait until the product is updated...
              </Alert>
            )}
            <Grid container>
              <Grid item xs={12} align="center">
                <img
                  src={previewImage}
                  width={300}
                  height={300}
                  alt="preview image"
                  className={classes.nextImage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="image"
                  margin="dense"
                  variant="outlined"
                  type="file"
                  accept="image/*"
                  onChange={selectImage}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <TextField
              autoFocus
              id="name"
              margin="dense"
              label="Name"
              variant="outlined"
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
                variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  disabled={loading ? true : false}
                  variant="contained"
                  onClick={handleClose}
                  color="secondary"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={submitHandler}
                  color="primary"
                  fullWidth
                >
                  {loading ? "Updating..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
