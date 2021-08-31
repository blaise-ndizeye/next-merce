import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
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
  cardImg: {
    height: "236px",
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
    textAlign: "center",
    fontSize: "1.5rem",
  },
  form: {
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
  },
})

export default useStyles
