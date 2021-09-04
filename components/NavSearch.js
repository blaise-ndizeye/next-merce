import InputBase from "@material-ui/core/InputBase"
import useStyles from "../utils/styles"

export default function NavSearch() {
  const classes = useStyles()
  return (
    <InputBase
      placeholder="Search for product…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ "aria-label": "search" }}
    />
  )
}
