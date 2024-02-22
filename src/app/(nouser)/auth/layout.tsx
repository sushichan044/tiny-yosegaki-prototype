import { Container } from "@mantine/core"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 bg-nakuru-50">
      <Container className="my-6 md:my-12" size="lg">
        {children}
      </Container>
    </main>
  )
}
