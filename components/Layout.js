import React from "react"
import Head from "next/head"
import NextLink from "next/link"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import {
  Typography,
  Container,
  Link,
  ThemeProvider,
  Switch,
} from "@material-ui/core"
import Cookies from "js-cookie"
import { createTheme } from "@material-ui/core/styles"
import useStyles from "../utils/styles"
import { CssBaseline } from "@material-ui/core"
import { purple, red } from "@material-ui/core/colors"
import { Store } from "../utils/Store"

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
            <div className={classes.linkWrapper}>
              <Switch
                checked={state.darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography>Cart</Typography>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>
                  <Typography>Login</Typography>
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
