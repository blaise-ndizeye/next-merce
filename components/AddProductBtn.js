import React from "react"
import NextLink from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function AddProductBtn() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NextLink href="/product/add" passHref>
        <Fab variant="extended" color="primary" aria-label="add">
          <AddIcon className={classes.extendedIcon} />
          Add a product
        </Fab>
      </NextLink>
    </div>
  )
}
