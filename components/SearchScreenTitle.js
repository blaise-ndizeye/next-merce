import NextLink from "next/link"
import { Grid, Typography, Link, Divider } from "@material-ui/core"
import useStyles from "../utils/styles"

export default function SearchScreenTitle(props) {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <Typography className={classes.productTitle}>
            {props.title} <b className={classes.keyword}>{props.keyword}</b>
          </Typography>
        </Grid>
        <Grid item md={6} sm={12} align="right">
          <Typography className={classes.productTitle}>
            Total found: <b className={classes.keyword}>{props.dataLength}</b>
            {props.showLink && (
              <NextLink href={props.link} passHref>
                <Link>&nbsp;{props.linkName}</Link>
              </NextLink>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10 }} />
    </>
  )
}
