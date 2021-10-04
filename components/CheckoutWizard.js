import React from "react"
import { Step, StepLabel, Stepper } from "@material-ui/core"
import useStyles from "../utils/styles"

export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles()
  return (
    <Stepper
      className={classes.bgTransparent}
      style={{ backgroundColor: "transparent" }}
      activeStep={activeStep}
      alternativeLabel
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  )
}
