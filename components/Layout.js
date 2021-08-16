import React from "react"
import Head from "next/head"
import NextLink from "next/link"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import { Typography, Container, Link } from "@material-ui/core"
import useStyles from "../utils/styles"

export const Layout = ({ children, title, description }) => {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Next Commerce` : "Next Commerce"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <ToolBar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>COMMERCE</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </ToolBar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        All rights reserved Next commerce
      </footer>
    </div>
  )
}
