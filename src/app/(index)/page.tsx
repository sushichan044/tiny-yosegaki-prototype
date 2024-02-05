import { Button, Center, Container, Title } from "@mantine/core"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Container size="sm">
        <Title className="text-center" order={1}>
          寄せ書きをもっと気軽に
        </Title>
        <Center>
          <Button color="nakuru" component={Link} href="/login">
            ログインしてはじめる
          </Button>
        </Center>
      </Container>
    </main>
  )
}
