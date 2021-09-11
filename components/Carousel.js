import MuiCorousel from "react-material-ui-carousel"

export default function Carousel(props) {
  return (
    <MuiCorousel animation="slide" timeout={1000} indicators={false}>
      {props.children}
    </MuiCorousel>
  )
}
