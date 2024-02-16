import { Container } from "@mantine/core"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex-1 bg-white">
        <Container className="my-6 md:my-12" size="md">
          {children}
        </Container>
      </main>
    </>
  )
}
