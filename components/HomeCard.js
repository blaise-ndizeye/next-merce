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
import ArrowFowardIcon from "@material-ui/icons/ArrowForward"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"

export default function HomeCard(props) {
  const classes = useStyles()
  const state = useSelector((state) => state)
  const { userInfo } = state
  return (
    <Card className={classes.homeCardCover}>
      <CardContent className={classes.homeCardTextContainer}>
        <Typography
          style={{ fontSize: 40, color: "white" }}
          className={classes.homeCardTitle}
          component="h1"
        >
          Hello{userInfo ? ` ${userInfo.name}` : ""}, welcome to Next Commerce
        </Typography>
        <Typography component="h5" className={classes.homeCardText}>
          E-commerce platform for purchasing the products you want at any
          anytime and get it for short time, and also there are other many
          services you can connect with your account which are under development
          otherwise if you don't know how to use it we recommend reading the
          contents in the about screen or by clicking the button below
        </Typography>
      </CardContent>
      <CardActions>
        {state.userInfo ? (
          <NextLink href="/about" passHref>
            <Button
              endIcon={<ArrowFowardIcon />}
              size="large"
              color="primary"
              variant="contained"
              className={classes.homeCardBtn}
            >
              Read More
            </Button>
          </NextLink>
        ) : (
          <NextLink href="/login" passHref>
            <Button
              endIcon={<ArrowFowardIcon />}
              size="large"
              color="primary"
              variant="contained"
              className={classes.homeCardBtn}
            >
              Get started
            </Button>
          </NextLink>
        )}
      </CardActions>
    </Card>
  )
}
