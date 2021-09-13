import React from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Cookies from "js-cookie"
import NextLink from "next/link"
import { useRouter } from "next/router"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Link from "@material-ui/core/Link"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import InfoIcon from "@material-ui/icons/Info"
import HistoryIcon from "@material-ui/icons/History"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import HomeIcon from "@material-ui/icons/Home"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import NavSearch from "./NavSearch"
import LogoutDialog from "./LogoutDialog"

function NavBar() {
  const router = useRouter()
  const classes = useStyles()
  const { state, dispatch } = React.useContext(Store)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const darkModeChangeHandler = () => {
    dispatch({ type: state.darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" })
    const newDarkMode = !state.darkMode
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null)
    if (redirect) {
      router.push(redirect)
    }
  }

  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: "USER_LOGOUT" })
    router.push("/")
  }

  const menuId = "primary-search-account-menu"
  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {state.userInfo && (
        <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar className={classes.pink}>
              {state.userInfo.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <p>&nbsp;Profile</p>
        </MenuItem>
      )}
      <NextLink href="/" passHref forwardRef>
        <MenuItem>
          <IconButton aria-label="home" color="inherit">
            <HomeIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </NextLink>
      <NextLink href="/cart" passHref forwardRef>
        <MenuItem>
          <IconButton aria-label="Cart" color="inherit">
            {state.cart.cartItems.length > 0 ? (
              <Badge
                color="secondary"
                badgeContent={state.cart.cartItems.length}
              >
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )}
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </NextLink>
      <MenuItem onClick={darkModeChangeHandler}>
        <IconButton aria-label="Dark Ligth mode" color="inherit">
          {!state.darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <p>Light/Dark Mode</p>
      </MenuItem>
      <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/about")}>
        <IconButton
          aria-label="About"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <InfoIcon />
        </IconButton>
        <p>About</p>
      </MenuItem>
      {state.userInfo ? (
        <div key={Math.random() * 100}>
          <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/order-history")}>
            <IconButton aria-label="Order history" color="inherit">
              <HistoryIcon />
            </IconButton>
            <p>Order History</p>
          </MenuItem>
          <LogoutDialog
            type="menuItem"
            logoutClickHandler={logoutClickHandler}
          />
        </div>
      ) : (
        <div key={Math.random() * 100}>
          <NextLink href="/login" passHref forwardRef>
            <MenuItem>
              <IconButton aria-label="Login" color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </NextLink>
          <NextLink href="/register" passHref forwardRef>
            <MenuItem>
              <IconButton aria-label="Register" color="inherit">
                <PersonAddIcon />
              </IconButton>
              <p>Register</p>
            </MenuItem>
          </NextLink>
        </div>
      )}
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref forwardRef>
            <Link>
              <Typography
                className={clsx(classes.navTitle, classes.homeCardText)}
                variant="h6"
                component="h1"
                noWrap
              >
                Next Commerce
              </Typography>
            </Link>
          </NextLink>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <NavSearch />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <NextLink href="/" passHref forwardRef>
              <IconButton
                className={clsx(
                  classes.navBtn,
                  router.pathname === "/" && classes.active
                )}
                aria-label="home"
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
            </NextLink>
            <NextLink href="/cart" passHref forwardRef>
              <IconButton
                className={clsx(
                  classes.navBtn,
                  router.pathname === "/cart" && classes.active
                )}
                aria-label="Cart"
                color="inherit"
              >
                {state.cart.cartItems.length > 0 ? (
                  <Badge
                    color="secondary"
                    badgeContent={state.cart.cartItems.length}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </IconButton>
            </NextLink>
            <IconButton
              onClick={darkModeChangeHandler}
              aria-label="Dark Ligth mode"
              color="inherit"
            >
              {!state.darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <NextLink href="/about" passHref forwardRef>
              <IconButton
                className={clsx(
                  classes.navBtn,
                  router.pathname === "/about" && classes.active
                )}
                aria-label="About"
                color="inherit"
              >
                <InfoIcon />
              </IconButton>
            </NextLink>
            {!state.userInfo ? (
              <div key={Math.random() * 100}>
                <NextLink href="/login" passHref forwardRef>
                  <IconButton
                    className={clsx(
                      classes.navBtn,
                      router.pathname === "/login" && classes.active
                    )}
                    aria-label="Login"
                    color="inherit"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </NextLink>
                <NextLink href="/register" passHref forwardRef>
                  <IconButton
                    className={clsx(
                      classes.navBtn,
                      router.pathname === "/register" && classes.active
                    )}
                    aria-label="Register"
                    color="inherit"
                  >
                    <PersonAddIcon />
                  </IconButton>
                </NextLink>
              </div>
            ) : (
              <div key={Math.random() * 100}>
                <NextLink href="/order-history" passHref forwardRef>
                  <IconButton
                    className={clsx(
                      classes.navBtn,
                      router.pathname === "/order-history" && classes.active
                    )}
                    aria-label="History"
                    color="inherit"
                  >
                    <HistoryIcon />
                  </IconButton>
                </NextLink>
                <LogoutDialog
                  type="icon"
                  logoutClickHandler={logoutClickHandler}
                />
                <NextLink href="/profile" passHref forwardRef>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Avatar className={classes.pink}>
                      {state.userInfo.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </NextLink>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

export default dynamic(() => Promise.resolve(NavBar), { ssr: false })
