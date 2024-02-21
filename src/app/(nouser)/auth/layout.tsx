import { Container } from "@mantine/core"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container className="my-6 md:my-12 flex-1" component="main" size="lg">
      {children}
    </Container>
  )
}
