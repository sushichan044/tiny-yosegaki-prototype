import { Container } from "@mantine/core"

export default function NormalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex-1 bg-white">
        <Container className="my-4 md:my-8" size="sm">
          {children}
        </Container>
      </main>
    </>
  )
}
