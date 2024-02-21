import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { Container } from "@mantine/core"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header showUserHeader={false} />
      <Container className="my-6 md:my-12 flex-1" component="main" size="lg">
        {children}
      </Container>
      <Footer />
    </>
  )
}
