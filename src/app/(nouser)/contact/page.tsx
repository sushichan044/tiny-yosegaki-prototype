import { Anchor, Container, Stack, Title } from "@mantine/core"

export const metadata = {
  title: "お問い合わせ",
}

export default function Page() {
  return (
    <main className="flex-1 bg-nakuru-50">
      <Container className="my-6 md:my-12" size="sm">
        <Stack gap="xl">
          <Title className="tracking-widest" order={1}>
            お問い合わせ先
          </Title>
          <Stack component="section" gap="xs">
            <Title order={2}>開発者のX(旧Twitter)</Title>
            <Anchor
              c="nakuru"
              href="https://x.com/sushichan_044"
              target="_blank"
            >
              https://x.com/sushichan_044
            </Anchor>
          </Stack>
        </Stack>
      </Container>
    </main>
  )
}
