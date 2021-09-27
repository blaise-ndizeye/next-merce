import { Divider, Typography } from "@material-ui/core"
import Layout from "../components/Layout"
import ErrorCard from "/components/ErrorCard"
import useStyles from "../utils/styles"

function NotFound() {
  const classes = useStyles()
  return (
    <Layout
      title="Page not found"
      description="The page you are searching for doesn't exist"
    >
      <Typography className={classes.title}>
        OOPS!!! 404. this page doesn't exist
      </Typography>
      <Divider />
      <ErrorCard
        title="Page not found"
        keyword="404"
        description="The page you are looking for doesn't exist please check your url or click the button below to go to homepage"
        redirectLink="/"
        redirectName="Go to home"
      />
    </Layout>
  )
}

export default NotFound
