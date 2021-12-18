import React from "react"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import clsx from "clsx"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
import { blueGrey } from "@material-ui/core/colors"
import { useRouter } from "next/router"
import useStyles from "../utils/styles"
import { getError } from "../utils/error"
import { useSnackbar } from "notistack"

function NavSearch() {
  const router = useRouter()
  const [text, setText] = React.useState("")
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const classes = useStyles()

  const submitHandler = async (e) => {
    e.preventDefault()
    closeSnackbar()

    try {
      dispatch({ type: "OPEN_LOADER" })
      const { data } = await axios.get(`/api/products/search?search=${text}`)
      dispatch({ type: "SEARCH_PRODUCT_RESULT", payload: data })
      router.push(`/search/product/${text}`)
      dispatch({ type: "CLOSE_LOADER" })
    } catch (err) {
      dispatch({ type: "CLOSE_LOADER" })
      enqueueSnackbar(getError(err), { variant: "error" })
    }
  }
  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <TextField
        placeholder="Search for product…"
        name="search_for_product"
        variant="outlined"
        value={text}
        classes={clsx(classes.inputRoot, classes.inputInput)}
        inputProps={{
          "aria-label": "search",
          style: {
            color: "white",
            backgroundColor: blueGrey[500],
            padding: 10,
            borderRadius: 5,
          },
        }}
        onChange={(e) => setText(e.target.value)}
        required
      />
    </form>
  )
}

export default dynamic(() => Promise.resolve(NavSearch), { ssr: false })
