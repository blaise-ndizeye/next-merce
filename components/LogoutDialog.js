import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import LockIcon from "@material-ui/icons/Lock"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import ListItem from "@material-ui/core/ListItem"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import useStyles from "../utils/styles"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function LogoutDialog(props) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const handleToggleDialog = () => {
    setOpen(!open)
  }
  const confirmHandler = () => {
    props.logoutClickHandler()
    setOpen(false)
  }
  return (
    <>
      {props.type === "icon" && (
        <IconButton
          onClick={handleToggleDialog}
          aria-label="Logout"
          color="inherit"
        >
          <LockIcon />
        </IconButton>
      )}
      {props.type === "menuItem" && (
        <MenuItem onClick={handleToggleDialog}>
          <IconButton aria-label="Logout" color="inherit">
            <LockIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
      {props.type === "listItem" && (
        <ListItem>
          <Link
            variant="body2"
            className={classes.muiLink}
            onClick={handleToggleDialog}
          >
            <Typography style={{ textAlign: "center" }}>
              Logout &nbsp;
            </Typography>
          </Link>
        </ListItem>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToggleDialog}
        aria-labelledby="Logout Dialog"
        aria-describedby="Warning the user before logout"
      >
        <DialogTitle id="Logout Dialog">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Warning the user before logout">
            Once you agree you will be logged out from this site and some data
            will be lost but not important ones like cart items
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleDialog} color="secondary">
            Disagree
          </Button>
          <Button onClick={confirmHandler} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
