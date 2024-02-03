import SignInButton from "@/features/auth/components/SignInButton"
import { Container, Title } from "@mantine/core"

export default function Home() {
  return (
    <main>
      <Container>
        <Title order={1}>
          La prière 1st Tour SPLASH the TONE 東京振替公演 開催記念寄せ書き
        </Title>
        <SignInButton redirectTo="/post" />
      </Container>
    </main>
  )
}
