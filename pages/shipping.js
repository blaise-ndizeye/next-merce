import React from "react"
import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import { Store } from "../utils/Store"

export default function Shipping() {
  const router = useRouter()
  const { state, dispatch } = React.useContext(Store)
  React.useEffect(() => {
    if (!state.userInfo) {
      router.push("/login?redirect=/shipping")
    }
  }, [])
  return (
    <Layout>
      <p>Shipping</p>
    </Layout>
  )
}
