import React from "react"
import Head from "next/head"
import { Container, ThemeProvider } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { purple, red } from "@material-ui/core/colors"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"
import NProgress from "nprogress"
import Router from "next/router"
import NavBar from "./NavBar"
import Footer from "./Footer"
import NewAppBar from "./NewNavBar"

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export const Layout = ({ children, title, description }) => {
  const { state } = React.useContext(Store)
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
        <NewAppBar />
        {/* <NavBar /> */}
        <Container className={classes.main}>{children}</Container>
        <Footer />
      </ThemeProvider>
    </>
  )
}
