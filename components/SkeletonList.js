import React from "react"
import { Grid } from "@material-ui/core"
import SkeletonScreen from "./SkeletonScreen"

export default function SkeletonList() {
  return [1, 2, 3, 4, 5, 6].map((item) => (
    <Grid item md={4} sm={6} xs={12} key={item}>
      <SkeletonScreen />
    </Grid>
  ))
}
