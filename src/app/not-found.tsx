import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { Container } from "@mantine/core"

export const metadata: Metadata = {}

export default function Layout() {
  return (
    <>
      <Header showUserHeader={false} />
      <main className="flex-1 bg-nakuru-50">
        <Container className="my-6 md:my-12" size="lg">
          <h1>404 not found</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}
