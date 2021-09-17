import { alpha, makeStyles } from "@material-ui/core/styles"
import { pink, red, purple } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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
    color: "lightblue",
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
  homeCardTitle: {
    fontSize: 40,
    color: "white",
  },
  homeCardCover: {
    backgroundImage: "url(/images/homeCardImage.jpg)",
    backgroundPosition: "center",
    padding: "35px 25px",
  },
  homeCardText: {
    color: "white",
  },
  tagLine: {
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 7,
  },
  anotherPageLink: {
    textAlign: "center",
    marginTop: 7,
    marginBottom: 7,
  },
  displayFlex: {
    display: "flex",
    flex: 1,
    flexDirection: "space-between",
  },
  errorCard: {
    maxWidth: 400,
    textAlign: "center",
    padding: "20px 20px",
    margin: "auto",
    marginTop: 15,
  },
  errorCardTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  errorCardText: {
    fontSize: "0.9rem",
    marginTop: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: "1.2rem",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  keyword: {
    color: "lightblue",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardPriceWrapper: {
    textAlign: "center",
    backgroundColor: purple[50],
  },
  cardPrice: {
    color: purple[900],
    padding: 10,
  },
  cardAvatar: {
    backgroundColor: purple[600],
    color: "white",
  },
  cardDeleteButton: {
    color: "white",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[200],
    },
  },
  cartAddButton: {
    color: "white",
    backgroundColor: purple[700],
    "&:hover": {
      backgroundColor: purple[500],
    },
  },
  footerSection: {
    backgroundColor: "#3D4849",
    color: "white",
  },
  footerParagraph: {
    marginTop: 10,
    padding: 5,
  },
}))

export default useStyles
