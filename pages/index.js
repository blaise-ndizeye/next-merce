import NextLink from "next/link"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core"
import { Layout } from "../components/Layout"
import data from "../utils/data"
import useStyles from "../utils/styles"

export default function Home() {
  const classes = useStyles()
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3} justify="center">
          {data.products.map((product) => (
            <Grid item md={4} sm={6} xs={12} key={product.name}>
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
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}
