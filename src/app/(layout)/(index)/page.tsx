import type { Metadata } from "next"

import { Button, Center, Container, Stack, Title } from "@mantine/core"
import Link from "next/link"

export const metadata: Metadata = {
  title: "いいかんじのとっぷぺーじ",
}

export default function Home() {
  return (
    <main className="flex-1">
      <Container
        className="
        bg-gray-50"
        component="section"
      ></Container>
      <section></section>
      <Container>
        <Stack gap="lg">
          <Container size="sm">
            <Center>
              <Title order={1} size="h2">
                いい感じの名前
              </Title>
              <Button
                aria-disabled
                color="nakuru"
                component={Link}
                href="/login"
              >
                ログインしてはじめる
              </Button>
            </Center>
          </Container>
        </Stack>
      </Container>
    </main>
  )
}
