import React from "react"
import { Typography } from "@material-ui/core"
import useStyles from "../utils/styles"
import { Layout } from "../components/Layout"

export default function About() {
  const classes = useStyles()
  return (
    <Layout title="About">
      <Typography className={classes.title}>About</Typography>
    </Layout>
  )
}
