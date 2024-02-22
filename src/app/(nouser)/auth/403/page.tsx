import LinkButton from "@/components/ui/LinkButton"
import { Space, Stack, Text, Title } from "@mantine/core"

export const metadata = {
  title: "権限がありません",
}

export default function Page() {
  return (
    <Stack align="center" className="text-center" gap={0}>
      <Title className="tracking-widest" order={1} size={100}>
        403
      </Title>
      <Text c="gray" fw="bold" size="xl">
        このページを表示する権限がありません。
      </Text>
      <Space h="xl" />
      <LinkButton href="/">トップページへ戻る</LinkButton>
    </Stack>
  )
}
