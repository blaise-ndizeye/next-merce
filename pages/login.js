import React from "react"
import axios from "axios"
import NextLink from "next/link"
import TextField from "@material-ui/core/TextField"
import { Typography, List, ListItem, Button, Link } from "@material-ui/core"
import { Layout } from "../components/Layout"
import useStyles from "../utils/styles"

export default function Login() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const classes = useStyles()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/users/login", { email, password })
      alert("Successfull login")
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message)
    }
  }
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography className={classes.title}>Login</Typography>
        <List>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
