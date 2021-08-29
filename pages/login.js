import React from "react"
import NextLink from "next/link"
import TextField from "@material-ui/core/TextField"
import { Typography, List, ListItem, Button, Link } from "@material-ui/core"
import { Layout } from "../components/Layout"
import useStyles from "../utils/styles"

export default function Login() {
  const classes = useStyles()
  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography className={classes.title}>Login</Typography>
        <List>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              required
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              required
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
