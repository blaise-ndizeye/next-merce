import React from "react"
import Head from "next/head"
import NextLink from "next/link"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import { Typography, Container, Link, ThemeProvider } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"
import useStyles from "../utils/styles"
import { CssBaseline } from "@material-ui/core"
import { purple, red } from "@material-ui/core/colors"

export const Layout = ({ children, title, description }) => {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: purple[400],
      },
      secondary: {
        main: red[100],
      },
    },
  })
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Next Commerce` : "Next Commerce"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </div>
  )
}
