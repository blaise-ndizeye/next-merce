import React from "react"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import { Typography, Container } from "@material-ui/core"
import useStyles from "../utils/styles"

export const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>Next Commerce</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <ToolBar>
          <Typography className={classes.text}>Comerce</Typography>
        </ToolBar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        All rights reserved Next commerce
      </footer>
    </div>
  )
}
