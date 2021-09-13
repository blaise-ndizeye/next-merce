import React from "react"
import NextLink from "next/link"
import Layout from "/components/Layout"
import { Button, Card, Divider, Typography } from "@material-ui/core"
import { Store } from "/utils/Store"
import useStyles from "/utils/styles"
import Products from "/components/Products"
import ErrorCard from "../../../components/ErrorCard"
import SearchScreenTitle from "../../../components/SearchScreenTitle"

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
          title={`Search results for product:`}
          keyword={props.text}
        />
      ) : (
        <>
          <SearchScreenTitle
            title="Search results for product:"
            keyword={props.text}
            dataLength={products.length}
            showLink={false}
          />
          <ErrorCard
            title="No results found for"
            keyword={props.text}
            description="The product you are searching for not found please we recommend
              you to provide a well spelled word for product or click the button
              below"
            redirectLink="/product/all"
            redirectName="Go to products page"
          />
        </>
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
