import React from "react"
import { useSelector } from "react-redux"
import { Backdrop, Card } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"

export default function SimpleBackdrop() {
  const classes = useStyles()
  const state = useSelector((state) => state)

  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      <Backdrop className={classes.backdrop} open={state.appLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  )
}
