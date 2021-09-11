import React from "react"
import dynamic from "next/dynamic"
import { Grid } from "@material-ui/core"
import ProductCard from "./ProductCard"

function Products({ products }) {
  return (
    <div>
      <Grid container spacing={3} justifyContent="center" alignContent="center">
        {products.map((product) => (
          <Grid item md={4} sm={6} xs={12} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })
