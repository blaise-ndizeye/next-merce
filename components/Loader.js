import React from "react"
import { useSelector } from "react-redux"
import { Backdrop } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "../utils/styles"

export default function SimpleBackdrop() {
  const classes = useStyles()
  const state = useSelector((state) => state)

  return (
    <Backdrop style={{ zIndex: 1, color: "#fff" }} open={state.appLoader}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
