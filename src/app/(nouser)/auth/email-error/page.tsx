import LinkButton from "@/components/ui/LinkButton"
import { Space, Stack, Text, Title } from "@mantine/core"
import { IconMail } from "@tabler/icons-react"

export const metadata = {
  title: "ログインに失敗しました",
}

export default function Page() {
  return (
    <Stack align="center" className="text-center" gap={0}>
      <Title
        aria-label="メールアドレスエラー"
        className="tracking-widest"
        order={1}
      >
        <IconMail color="#2e2e2e" size={100} />
      </Title>
      <Text c="gray" fw="bold" size="xl">
        X(旧Twitter)アカウントにメールアドレスが登録されていません。
        <br />
        メールアドレスを登録したアカウントで再度お試しください。
      </Text>
      <Space h="xl" />
      <LinkButton href="/login">もう一度ログインする</LinkButton>
    </Stack>
  )
}
