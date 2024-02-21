import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { Container } from "@mantine/core"

export const metadata: Metadata = {}

export default function Layout() {
  return (
    <>
      <Header showUserHeader={false} />
      <Container className="my-6 md:my-12 flex-1" component="main" size="lg">
        <h1>404 not found</h1>
      </Container>
      <Footer />
    </>
  )
}
