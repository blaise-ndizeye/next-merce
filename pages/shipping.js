import { useRouter } from "next/router"
import React from "react"
import { Layout } from "../components/Layout"

export default function Shipping() {
  const router = useRouter()
  router.push("/login")
  return (
    <Layout>
      <p>Hello world</p>
    </Layout>
  )
}
