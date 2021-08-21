import React from "react"
import Head from "next/head"
import NextLink from "next/link"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import {
  Container,
  Link,
  ThemeProvider,
  Switch,
  Button,
} from "@material-ui/core"
import Cookies from "js-cookie"
import { createTheme } from "@material-ui/core/styles"
import useStyles from "../utils/styles"
import { CssBaseline } from "@material-ui/core"
import { purple, red } from "@material-ui/core/colors"
import { Store } from "../utils/Store"
import NProgress from "nprogress"
import Router from "next/router"

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export const Layout = ({ children, title, description }) => {
  const { state, dispatch } = React.useContext(Store)
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
      type: state.darkMode ? "dark" : "light",
      primary: {
        main: purple[400],
      },
      secondary: {
        main: red[100],
      },
    },
  })
  const classes = useStyles()
  const darkModeChangeHandler = () => {
    dispatch({ type: state.darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" })
    const newDarkMode = !state.darkMode
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }
  return (
    <>
      <Head>
        <title>{title ? `${title}-Next Commerce` : "Next Commerce"}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <ToolBar>
            <NextLink href="/" passHref>
              <Link>
                <Button className={classes.brand}>COMMERCE</Button>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div className={classes.linkWrapper}>
              <Switch
                color="primary"
                checked={state.darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  <Button>Cart</Button>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>
                  <Button>Login</Button>
                </Link>
              </NextLink>
            </div>
          </ToolBar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          All rights reserved Next commerce
        </footer>
      </ThemeProvider>
    </>
  )
}
