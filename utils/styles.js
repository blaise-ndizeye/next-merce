import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#f4f4f4",
    "& a": {
      color: "#000",
      marginLeft: 10,
    },
  },
  brand: {
    color: "#000",
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
  },
  cardImg: {
    height: "236px",
  },
})

export default useStyles
