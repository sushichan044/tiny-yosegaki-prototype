import SignInButton from "@/features/auth/components/SignInButton"
import { Container } from "@mantine/core"

export default function Home() {
  return (
    <main>
      <Container>
        <div>
          <h1>top</h1>
          <SignInButton redirectTo="/post" />
        </div>
      </Container>
    </main>
  )
}
