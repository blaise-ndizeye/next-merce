import React from "react"
import { Skeleton } from "@material-ui/lab"
import { Grid } from "@material-ui/core"

export default function ProductSkeleton() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Skeleton variant="circle" width={50} height={50} />
        </Grid>
        <Grid item xs={9}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangle" width={400} height={300} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </div>
  )
}
