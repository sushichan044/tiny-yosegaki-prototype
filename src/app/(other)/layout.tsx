import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { Container } from "@mantine/core"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-nakuru-50/50">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}