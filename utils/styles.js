import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#f4f4f4",
    "& a": {
      color: "#000",
      marginLeft: 10,
    },
  },
  text: {
    color: "#000",
  },
  main: {
    minHeight: "80vh",
  },
})

export default useStyles
