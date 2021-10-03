import React from "react"
import NextImage from "next/image"
import { Card, Divider, Grid, Typography } from "@material-ui/core"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import { Alert } from "@material-ui/lab"
import CheckIcon from "@material-ui/icons/Check"
import { purple } from "@material-ui/core/colors"
import useStyles from "../utils/styles"

export default function HomeSellingCard() {
  const classes = useStyles()

  return (
    <Grid container spacing={3} justifyContent="center" alignContent="center">
      <Grid item md={9} sm={12}>
        <div
          stle={{
            padding: 10,
          }}
        >
          <Typography
            style={{
              padding: 15,
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: purple[400],
            }}
          >
            <ArrowDownwardIcon />
            &nbsp;The best place to find the answers of your desires has
            reached.
          </Typography>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="info"
            style={{ marginBottom: 10 }}
          >
            There are many products on this platform and also if you don't find
            the one you are searching for please contact us to find your
            preference because its our work to make you happy.
          </Alert>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="info"
            style={{ marginBottom: 10 }}
          >
            What you need to do is to continue scrolling to find the products
            you want after you will find your the answers. for quick search
            please click in the searchbox above to save your time
          </Alert>
        </div>
      </Grid>
      <Grid item md={3} sm={12} align="center">
        <Typography
          style={{
            padding: 15,
            fontSize: "0.7rem",
            fontWeight: "bold",
            color: purple[400],
          }}
        >
          You will end with a lot of happiness
        </Typography>
        <NextImage
          src="/images/buying.jpg"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="/images/homeCardImage.jpg"
          className={classes.sellingImage}
        />
      </Grid>
    </Grid>
  )
}
