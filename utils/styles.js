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
})

export default useStyles
