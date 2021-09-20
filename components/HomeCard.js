import React from "react"
import { useDispatch, useSelector } from "react-redux"
import NextLink from "next/link"
import {
  Button,
  CardActions,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"

export default function HomeCard(props) {
  const classes = useStyles()
  const state = useSelector((state) => state)
  const { userInfo } = state
  return (
    <Card className={classes.homeCardCover}>
      <CardContent className={classes.homeCardTextContainer}>
        <Typography className={classes.homeCardTitle} component="h1">
          Hello{userInfo ? ` ${userInfo.name}` : ""}, welcome to Next Commerce
        </Typography>
        <Typography component="h5" className={classes.homeCardText}>
          For this e-commerce platform find the product you want at any anytime
          and get it for short time, if you don't know how to use it we
          recommend reading the contents in the about screen or by clicking the
          button below
        </Typography>
      </CardContent>
      <CardActions>
        <NextLink href="/about" passHref>
          <Button size="large" color="primary" className={classes.homeCardBtn}>
            Read More...
          </Button>
        </NextLink>
      </CardActions>
    </Card>
  )
}
