import type { Metadata } from "next"

import { Container, Title } from "@mantine/core"

export const metadata: Metadata = {
  title: "寄せ書きを、もっと気軽に。",
}

export default function Home() {
  return (
    <main>
      <Container size="sm">
        <Title className="text-center" order={1}>
          寄せ書きを、
          <br />
          もっと気軽に。
        </Title>
        {/* <Center>
          <Button color="nakuru" component={Link} href="/login">
            ログインしてはじめる
          </Button>
        </Center> */}
      </Container>
    </main>
  )
}
