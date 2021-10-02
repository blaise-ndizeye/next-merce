import React from "react"
import { useSelector, useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import axios from "axios"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Avatar,
  Typography,
} from "@material-ui/core"
import { pink } from "@material-ui/core/colors"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { categories } from "/utils/constants"
import useStyles from "/utils/styles"
import { getError } from "/utils/error"
import Layout from "/components/Layout"
import AddIcon from "@material-ui/icons/Add"

function AddProductPage() {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const classes = useStyles()

  const [image, setImage] = React.useState(null)
  const [previewImage, setPreviewImage] = React.useState("")
  const [category, setCategory] = React.useState("Others")
  const [brand, setBrand] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [rating, setRating] = React.useState(0)
  const [reviews, setNumReviews] = React.useState(0)
  const [countInStock, setCountInStock] = React.useState(0)
  const [description, setDescription] = React.useState("")
  const [name, setName] = React.useState("")

  const selectImage = (e) => {
    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    closeSnackbar()
    try {
      dispatch({ type: "OPEN_LOADER" })
      const formData = new FormData()
      formData.append("image", image, image.name)
      formData.append("name", name)
      formData.append("brand", brand)
      formData.append("category", category)
      formData.append("price", price)
      formData.append("countInStock", countInStock)
      formData.append("numReviews", reviews)
      formData.append("rating", rating)
      formData.append("description", description)

      await axios.post("/api/products/add", formData, {
        headers: {
          authorization: `Bearer ${state.userInfo.token}`,
        },
      })
      router.push("/product/all")
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar("Product added successfully", { variant: "success" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }

  React.useEffect(() => {
    if (!state.userInfo || (state.userInfo && !state.userInfo.isAdmin))
      return router.push("/")
  })

  return (
    <Layout title="Add product">
      <div className={classes.paper}>
        <Avatar
          style={{
            textAlign: "center",
            margin: 3,
            backgroundColor: pink[100],
            color: "white",
          }}
        >
          <AddIcon />
        </Avatar>
        <Typography component="h2" variant="h5" className={classes.title}>
          Add a product
        </Typography>
        <form
          className={classes.form}
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category">&nbsp;Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  label="Category"
                  variant="outlined"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Brand"
                type="text"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rating"
                label="Rating"
                type="number"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="reviews"
                label="Reviews"
                type="number"
                onChange={(e) => setNumReviews(e.target.value)}
                value={reviews}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="countInStock"
                label="Count In Stock"
                type="number"
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                name="description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Grid>
            <Grid item sm={previewImage ? 6 : 12} xs={12}>
              <TextField
                name="image"
                variant="outlined"
                required
                fullWidth
                type="file"
                accept="image/*"
                onChange={selectImage}
              />
            </Grid>
            <Grid item sm={previewImage ? 6 : 12} xs={12}>
              {previewImage && (
                <div>
                  <img
                    src={previewImage}
                    width={200}
                    height={200}
                    alt="preview file"
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add product
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(AddProductPage), { ssr: false })
