import React from "react"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic"
import axios from "axios"
import InputBase from "@material-ui/core/InputBase"
import { useRouter } from "next/router"
import useStyles from "../utils/styles"
import { getError } from "../utils/error"
import { useSnackbar } from "notistack"
import { Store } from "../utils/Store"

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
      <InputBase
        placeholder="Search for product…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        name="search_for_product"
        value={text}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default dynamic(() => Promise.resolve(NavSearch), { ssr: false })