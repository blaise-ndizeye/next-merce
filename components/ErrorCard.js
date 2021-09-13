import NextLink from "next/link"
import { Button, Card, Divider, Typography } from "@material-ui/core"
import useStyles from "/utils/styles"
import DeleteAccountDialog from "./DeleteAccountDialog"

export default function ErrorCard(props) {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.errorCard}>
        <Typography color="error">
          {props.title}{" "}
          <strong className={classes.errorCardTitle}>
            &nbsp;{props.keyword}
          </strong>
        </Typography>
        <Divider />
        <Typography className={classes.errorCardText}>
          {" "}
          {props.description}
        </Typography>
        <Divider />
        <NextLink href={props.redirectLink} passHref>
          {props.danger ? (
            <DeleteAccountDialog />
          ) : (
            <Button style={{ marginTop: 10 }} color="primary">
              {props.redirectName}
            </Button>
          )}
        </NextLink>
      </Card>
    </div>
  )
}
