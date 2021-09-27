import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { categories } from "../utils/constants"
import ProductCard from "../components/ProductCard"
import ErrorCard from "../components/ErrorCard"
import useStyles from "../utils/styles"
import AddProductBtn from "./AddProductBtn"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: 3, margin: 3 }}>{children}</div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  }
}

function ProductInCategory({ category, products, state }) {
  const productsToRender = products.filter(
    (product) => product.category == category
  )
  if (productsToRender.length === 0)
    return (
      <ErrorCard
        title="No products found with category: "
        keyword={category}
        description={
          state.userInfo && state.userInfo.isAdmin
            ? "There is no poduct with this category found if you want to manage the product of this category please add to the market by clicking the button above"
            : "Wait until the products are published to the market to buy produts with that category"
        }
        redirectLink="/"
        redirectName="Go to home"
      />
    )
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignContent="center"
      style={{ marginTop: 10 }}
    >
      {productsToRender.map((product) => (
        <Grid item md={4} sm={6} xs={12} key={product.name}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default function ProductSections(props) {
  const classes = useStyles()
  const state = useSelector((state) => state)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.tabRoot}>
      <AppBar position="static" color="default">
        {state.userInfo && state.userInfo.isAdmin && (
          <div style={{ display: "flex" }}>
            <Typography component="h2" className={classes.toolbarTitle}>
              _categories_
            </Typography>
            <div className={classes.grow} />
            <AddProductBtn />
          </div>
        )}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categories.map((item, index) => (
            <Tab key={index} label={item} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      {categories.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <ProductInCategory
            category={item}
            products={props.products}
            state={state}
          />
        </TabPanel>
      ))}
    </div>
  )
}
