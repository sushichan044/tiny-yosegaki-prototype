import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import LinkButton from "@/components/ui/LinkButton"
import { Container, Space, Stack, Text, Title } from "@mantine/core"

export const metadata: Metadata = {
  title: "見つかりませんでした",
}

export default function Layout() {
  return (
    <>
      <Header showUserHeader={false} />
      <main className="flex-1 bg-nakuru-50">
        <Container className="my-6 md:my-12" size="lg">
          <Stack align="center" className="text-center" gap={0}>
            <Title className="tracking-widest" order={1} size={100}>
              404
            </Title>
            <Text c="gray" fw="bold" size="xl">
              このページは存在しないか、削除された可能性があります。
            </Text>
            <Space h="xl" />
            <LinkButton href="/">トップページへ戻る</LinkButton>
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  )
}
