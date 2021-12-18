import React from "react"
import { useSelector } from "react-redux"
import Head from "next/head"
import dynamic from "next/dynamic"
import { Container, ThemeProvider, Slide } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { purple, red, blueGrey } from "@material-ui/core/colors"
import { Store } from "../utils/Store"
import useStyles from "../utils/styles"
import NProgress from "nprogress"
import Router from "next/router"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Loader from "./Loader"

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Layout({ children, title, description }) {
  const state = useSelector((state) => state)
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
        main: blueGrey[800],
      },
      secondary: {
        main: red[200],
      },
    },
  })
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title ? `${title} | Next Commerce` : "Next Commerce"}</title>
        <link rel="icon" href="/next-commerce.jpg" type="image/*" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {description ? (
          <meta name="description" content={description} />
        ) : (
          <meta
            name="description"
            content="E-commerce platform for selling and buying the products you want at any
          anytime and get it for short time. The concept is expressing your desires by buying what you want."
          />
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Slide direction="up" in={true} timeout={1000}>
          <Container className={classes.main}>{children}</Container>
        </Slide>
        <Loader />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false })
