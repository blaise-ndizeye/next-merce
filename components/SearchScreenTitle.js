import NextLink from "next/link"
import { Typography, Link, Divider } from "@material-ui/core"
import useStyles from "../utils/styles"

export default function SearchScreenTitle(props) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.displayFlex}>
        <Typography className={classes.productTitle}>
          {props.title} <b className={classes.keyword}>{props.keyword}</b>
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography className={classes.productTitle}>
          Total found: <b className={classes.keyword}>{props.dataLength}</b>
          {props.showLink && (
            <NextLink href={props.link} passHref>
              <Link>&nbsp;{props.linkName}</Link>
            </NextLink>
          )}
        </Typography>
      </div>
      <Divider style={{ marginBottom: 10 }} />
    </>
  )
}
