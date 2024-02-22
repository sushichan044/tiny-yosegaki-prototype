import LinkButton from "@/components/ui/LinkButton"
import { Space, Stack, Text, Title } from "@mantine/core"

export const metadata = {
  title: "ログインしてください",
}

export default function Page() {
  return (
    <Stack align="center" className="text-center" gap={0}>
      <Title className="tracking-widest" order={1} size={100}>
        401
      </Title>
      <Text c="gray" fw="bold" size="xl">
        ログインが必要です。
      </Text>
      <Space h="xl" />
      <LinkButton href="/login">ログインする</LinkButton>
    </Stack>
  )
}
