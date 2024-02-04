import SignInButton from "@/features/auth/components/SignInButton"
import { Alert, Container, Title } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"

export default function Home() {
  return (
    <main>
      <Container size="sm">
        <Title className="text-center" order={1}>
          La prière 1st Tour SPLASH the TONE <br />
          東京振替公演 開催記念寄せ書き
        </Title>
        <div className="space-y-8">
          <div className="mx-auto w-fit">
            <SignInButton redirectTo="/post" />
          </div>
          <Alert
            color="nayuta"
            icon={<IconAlertTriangle />}
            title="ログインする際の注意"
            variant="light"
          >
            ログインにはメールアドレスが登録されたTwitterアカウントが必要です。
          </Alert>
        </div>
      </Container>
    </main>
  )
}
