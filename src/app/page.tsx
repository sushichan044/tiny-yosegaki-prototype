import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { SITE_NAME } from "@/consts"
import { NOTO_SANS_JP } from "@/lib/font"
import { Button, Center, Container, Stack, Title } from "@mantine/core"
import { IconLogin2 } from "@tabler/icons-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "トップページ | " + SITE_NAME,
}

export default function Home() {
  return (
    <>
      <Header showUserHeader={false} />
      <main className="flex-1">
        <div className="bg-nakuru-50">
          <Container component="section" size="lg">
            <Title
              c="nakuru.6"
              // className={NOTO_SANS_JP.className}
              order={1}
              size="h2"
            >
              {SITE_NAME}
            </Title>
          </Container>
        </div>
        <div className="bg-white">
          <Container component="section">
            <Stack gap="lg">
              <Container size="sm">
                <Center>
                  <Button
                    color="nakuru"
                    component={Link}
                    href="/login"
                    rightSection={<IconLogin2 />}
                    size="lg"
                  >
                    ログインしてはじめる
                  </Button>
                </Center>
              </Container>
            </Stack>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}
