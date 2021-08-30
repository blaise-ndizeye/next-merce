import React from "react"
import NextLink from "next/link"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/ToolBar"
import { Link, Switch, Button, Badge, Menu, MenuItem } from "@material-ui/core"
import clsx from "clsx"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"

export default function NavBar() {
  const router = useRouter()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { state, dispatch } = React.useContext(Store)

  const darkModeChangeHandler = () => {
    dispatch({ type: state.darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" })
    const newDarkMode = !state.darkMode
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }

  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: "USER_LOGOUT" })
    router.push("/")
  }

  return (
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
              <Button
                className={clsx(
                  classes.navBtn,
                  router.pathname === "/cart" && classes.active
                )}
              >
                {state.cart.cartItems.length > 0 ? (
                  <Badge
                    color="secondary"
                    badgeContent={state.cart.cartItems.length}
                  >
                    Cart
                  </Badge>
                ) : (
                  "Cart"
                )}
              </Button>
            </Link>
          </NextLink>
          {state.userInfo ? (
            <>
              <Button
                aria-controls="btn-menu"
                aria-haspopup="true"
                className={classes.navBtn}
                onClick={loginClickHandler}
              >
                {state.userInfo.name}
              </Button>
              <Menu
                id="btn-menu"
                anchorEl={anchorEl}
                onClose={loginMenuCloseHandler}
                open={Boolean(anchorEl)}
                keepMounted
              >
                <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <Link>
                <Button
                  className={clsx(
                    classes.navBtn,
                    router.pathname === "/login" && classes.active
                  )}
                >
                  Login
                </Button>
              </Link>
            </NextLink>
          )}
          {!state.userInfo && (
            <NextLink href="/register" passHref>
              <Link>
                <Button
                  className={clsx(
                    classes.navBtn,
                    router.pathname === "/register" && classes.active
                  )}
                >
                  Register
                </Button>
              </Link>
            </NextLink>
          )}
        </div>
      </ToolBar>
    </AppBar>
  )
}
