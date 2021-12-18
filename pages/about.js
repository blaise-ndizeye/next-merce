import React from "react"
import NextImage from "next/image"
import { Card, Divider, Grid, Typography } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"
import useStyles from "../utils/styles"
import Layout from "../components/Layout"

const SkeletonCard = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.errorCard}>
      <Typography color="secondary">{props.title} </Typography>
      <Divider />
      <Typography className={classes.errorCardText}>
        {" "}
        {props.description}
      </Typography>
      <Divider />
    </Card>
  )
}

export default function About() {
  const classes = useStyles()
  const contents = [
    {
      title: "What is Next Commerce?",
      description:
        "E-commerce platform to find goods you want at any time with high discount and it may contain other many services later because they are still under development.",
    },
    {
      title: "How to  create an account?",
      description:
        "To create an account click on sign up button in the navbar or click on get started button on home screen and the account is free forever enjoy it once created.",
    },
    {
      title: "What payment methods used in this platform?",
      description:
        "PayPal is the only payment method implemented other alternatives are still under development including Stripe and MTN",
    },
    {
      title: "How to purchase a product?",
      description:
        "To purchase a product you click to add to cart button  and you will be redirected to cart screen for more option and click the buttons you find there according to your preference.",
    },
    {
      title: "How does the delivery happen?",
      description:
        "The address entered in purchasing process will be used in the delivery of your products make sure to enter an appropriate address for your product security or contact us for information",
    },
    {
      title: "Where to share your ideas?",
      description:
        "In footer there is a form where you can add your problems, share your ideas or any other thought regarding the Next Commerce platform or any talk to admin.",
    },
    {
      title: "How to talk to a developer?",
      description:
        "In footer there is section where there is contact of the developer and the next-commerce platform feel free to contact at any problem or for emergency or use other social medias",
    },
    {
      title: "Where to find related apps?",
      description:
        "There is other many apps with different purpose developed with stackFielders team including smart-library for managing a school library and stocka for stock management",
    },
    {
      title: "Links for the related apps",
      description:
        "Stocka(https://stocka.herokuapp.com), smartlibrary(stflibrary.herokuapp.com) and others can be shared on your email if you want send your email using the form in the footer.",
    },
  ]
  return (
    <Layout title="About">
      <Typography
        style={{
          marginTop: 12,
          marginBottom: 10,
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        All you need to know about{" "}
        <strong style={{ color: "lightblue" }}>Next Commerce</strong>
      </Typography>
      <Divider />
      <Typography
        style={{
          fontSize: "0.8rem",
          padding: 10,
          color: blueGrey[400],
        }}
        component="h2"
      >
        Here you will find information on how to use this platform and answers
        for some questions you may ask yourself.{" "}
        <strong style={{ fontSize: "1rem" }}>
          Answers for some such questions
        </strong>{" "}
        are found here and other information you may not know about{" "}
        <strong>Next Commerce</strong> if you want to know more please read.
      </Typography>
      <Divider />
      <Grid container spacing={1} justifyContent="center" alignContent="center">
        {contents.map((content, index) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <SkeletonCard
              title={content.title}
              description={content.description}
            />
          </Grid>
        ))}
      </Grid>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <Grid container>
        <Grid item xs={9}>
          <Typography
            style={{
              fontSize: "0.8rem",
              padding: 10,
              color: "lightblue",
            }}
            component="h2"
          >
            Feel free to purchase any kind of product because here you have the
            best place for your wishes. What you have to do is to{" "}
            <strong style={{ fontSize: "1rem" }}>
              express your desires and buy what you want.
            </strong>{" "}
            Because with your desires you give us a purpose to make you happy
            because we are
            <strong style={{ fontSize: "1rem" }}>
              <i>&nbsp;Next Commerce.</i>
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={3} align="right">
          <NextImage
            src="/images/buying.jpg"
            alt="Buying from cart"
            width={150}
            height={150}
            className={classes.sellingImage}
            placeholder="blur"
            blurDataURL="/images/homeCardImage.jpg"
          />
        </Grid>
      </Grid>
    </Layout>
  )
}
