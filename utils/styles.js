import { alpha, makeStyles } from "@material-ui/core/styles"
import { pink } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "rgb(76, 22, 83)",
    "& a": {
      color: "#f4f4f4",
      marginLeft: 10,
    },
  },
  brand: {
    color: "#f4f4f4",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  footerFormTitle: {
    fontSize: "1.2rem",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  cardImg: {
    height: "236px",
  },
  muiLink: {
    cursor: "pointer",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkWrapper: {
    display: "flex",
    flexDirection: "flex-end",
  },
  navBtn: {
    color: "#f4f4f4",
  },
  active: {
    color: "red",
  },
  title: {
    marginTop: 12,
    marginBottom: 10,
    textAlign: "center",
    fontSize: "1.5rem",
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
    textAlign: "center",
    padding: "20px",
    marginTop: 20,
    backgroundColor: "#f4f4f4",
    width: "100%",
    borderRadius: 20,
  },
  fullWidth: {
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navTitle: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  pink: {
    color: "#f4f4f4",
    backgroundColor: pink[100],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))

export default useStyles
