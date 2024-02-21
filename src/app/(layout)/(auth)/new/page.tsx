import type { Metadata } from "next"

import NewProjectForm from "@/features/projects/components/NewProjectForm"
import { getUserFromSession } from "@/features/users/db"
import { Alert, Container, Stack, Title } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "新しい寄せ書き企画を立てる",
}

export default async function Page() {
  const { data } = await getUserFromSession()
  if (!data) {
    redirect("/login")
  }

  return (
    <Container size="sm">
      <Stack gap="lg">
        <Title order={1}>新しい寄せ書き企画を立てる</Title>
        <Alert color="nayuta" icon={<IconAlertCircle />} title="おわび">
          開発版では新規企画の作成ができません。申し訳ありません。
        </Alert>
        <NewProjectForm isDisabledFeature user={data} />
      </Stack>
    </Container>
  )
}
