// import EmailButton from "@/features/auth/components/SignIn/EmailButton"
import TwitterButton from "@/features/auth/components/SignIn/TwitterButton"
import { Alert, Container, Stack } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"

type Props = {
  redirectTo?: string | undefined
}

export default function SignIn({ redirectTo }: Props) {
  redirectTo ??= "/"

  return (
    <Container maw={320} p={0}>
      <Stack gap="md">
        <TwitterButton redirectTo={redirectTo} />
        {/* <EmailButton /> */}
        <Alert
          color="nayuta"
          icon={<IconAlertTriangle />}
          title="ログインする際の注意"
          variant="light"
        >
          Xアカウントでログインするには
          <b>メールアドレスが登録されている</b>必要があります。
          <br />
          ログインに失敗する場合は、Xアカウントにメールアドレスが登録されいるか今一度ご確認ください。
        </Alert>
      </Stack>
    </Container>
  )
}
