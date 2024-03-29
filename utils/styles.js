import { makeStyles } from "@material-ui/core/styles"
import { pink, red, blueGrey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  sellingImage: {
    borderRadius: "50%",
    textAlign: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  brand: {
    color: "#f4f4f4",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  toolbarTitle: {
    padding: 10,
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: blueGrey[600],
    textTransform: "uppercase",
    marginLeft: 10,
    marginTop: 10,
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
    width: "100%",
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
    marginTop: 12,
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
    marginBottom: 5,
  },
  keyword: {
    color: "lightblue",
    fontWeight: "bold",
    textTransform: "uppercase",
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
    backgroundColor: blueGrey[700],
    "&:hover": {
      backgroundColor: blueGrey[500],
    },
  },
  footerParagraph: {
    marginTop: 10,
    padding: 5,
  },
  linkBtn: {
    color: blueGrey[900],
    backgroundColor: blueGrey[50],
    "&:hover": {
      backgroundColor: blueGrey[100],
    },
  },
  tabRoot: {
    flexGrow: 1,
    width: "100%",
  },
  nextImage: {
    borderRadius: 10,
  },
  cartContinueBtn: {
    color: blueGrey[900],
    backgroundColor: blueGrey[50],
    "&:hover": {
      backgroundColor: blueGrey[100],
    },
  },
  search: {
    borderRadius: 10,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    color: "white",
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
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },
  },
}))

export default useStyles
