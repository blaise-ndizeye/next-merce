import React from "react"
import NextLink from "next/link"
import Layout from "/components/Layout"
import { Button, Card, Divider, Typography } from "@material-ui/core"
import { Store } from "/utils/Store"
import useStyles from "/utils/styles"
import Products from "/components/Products"

export default function SearchScreen(props) {
  const { dispatch, state } = React.useContext(Store)
  const classes = useStyles()
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    setProducts(state.searchProductResult)
    return () => dispatch({ type: "EMPTY_PRODUCT_SEARCH" })
  }, [props.text])

  return (
    <Layout title={`Search for ${props.text}`}>
      {products.length > 0 ? (
        <Products
          type="search"
          products={products}
          title={`Search results for ${props.text}`}
        />
      ) : (
        <div>
          <Card className={classes.errorCard}>
            <Typography color="error">
              No results found for{" "}
              <strong className={classes.errorCardTitle}>
                &nbsp;{props.text}
              </strong>
            </Typography>
            <Divider />
            <Typography className={classes.errorCardText}>
              {" "}
              The product you are searching for not found please we recommend
              you to provide a well spelled word for product or click the button
              below
            </Typography>
            <Divider />
            <NextLink href="/product/all" passHref>
              <Button style={{ marginTop: 10 }} color="primary">
                Go to products page
              </Button>
            </NextLink>
          </Card>
        </div>
      )}
    </Layout>
  )
}

export function getServerSideProps(ctx) {
  return {
    props: {
      text: ctx.query.product,
    },
  }
}
