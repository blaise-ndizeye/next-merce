import NextLink from "next/link"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@material-ui/core"
import useStyles from "../utils/styles"

export default function ProductCard({ product }) {
  const classes = useStyles()
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
            className={classes.cardImg}
          ></CardMedia>
        </CardActionArea>
      </NextLink>
      <CardContent>
        <Typography>{product.name}</Typography>
      </CardContent>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}
