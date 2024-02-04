import Footer from "@/components/layouts/Footer"
import { Container } from "@mantine/core"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex-1 bg-nakuru-50/50">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
