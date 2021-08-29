import React from "react"
import axios from "axios"
import NextLink from "next/link"
import { useRouter } from "next/router"
import TextField from "@material-ui/core/TextField"
import { Typography, List, ListItem, Button, Link } from "@material-ui/core"
import { Layout } from "../components/Layout"
import useStyles from "../utils/styles"
import { Store } from "../utils/Store"

export default function Login() {
  const router = useRouter()
  const { dispatch, state } = React.useContext(Store)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const classes = useStyles()
  React.useEffect(() => {
    if (state.userInfo) {
      router.push("/")
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/users/login", { email, password })
      dispatch({ type: "USER_LOGIN", payload: data })
      router.push(router.query.redirect || "/")
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message)
    }
  }
  return (
    <Layout title="Login">
      <form
        onSubmit={submitHandler}
        className={classes.form}
        autoComplete="off"
      >
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
