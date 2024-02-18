import { Container } from "@mantine/core"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex-1 bg-gray-100">
        <Container className="my-6 md:my-12" size="lg">
          {children}
        </Container>
      </main>
    </>
  )
}
