import React from "react"
import { useSelector } from "react-redux"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"

export default function SimpleBackdrop() {
  const classes = useStyles()
  const state = useSelector((state) => state)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={state.appLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
