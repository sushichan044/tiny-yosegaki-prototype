import LinkButton from "@/components/ui/LinkButton"
import { Anchor, Space, Stack, Text, Title } from "@mantine/core"
import { IconMoodCry } from "@tabler/icons-react"

export const metadata = {
  title: "ログインに失敗しました",
}

export default function Page() {
  return (
    <Stack align="center" className="text-center" gap={0}>
      <Title aria-label="認証エラー" className="tracking-widest" order={1}>
        <IconMoodCry color="#2e2e2e" size={100} />
      </Title>
      <Text c="gray" fw="bold" size="xl">
        認証に失敗しました。
        <br />
        お手数ですが、もう一度お試しください。
        <br />
        もし解消しない場合は
        <Anchor c="nakuru" fw="bold" href="/contact" target="_blank">
          お問い合わせ
        </Anchor>
        ください。
      </Text>
      <Space h="xl" />
      <LinkButton href="/login">もう一度ログインする</LinkButton>
    </Stack>
  )
}
