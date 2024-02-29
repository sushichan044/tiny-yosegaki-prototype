import type { Metadata } from "next"

import LinkButton from "@/components/ui/LinkButton"
import MessageForm from "@/features/messages/components/MessageForm"
import { checkProjectIsAvailable } from "@/features/projects/action"
import { getProjectForMetaData } from "@/features/projects/db"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Alert, Center, Container, Stack, Text, Title } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import { notFound, redirect } from "next/navigation"

type ProjectParams = { params: { id: string } }

// export async function generateStaticParams() {
//   const projects = await db.query.projects.findMany({
//     columns: { projectId: true },
//   })
//   return projects.map((p) => ({ id: p.projectId }))
// }

export const generateMetadata = async ({
  params: { id },
}: ProjectParams): Promise<Metadata> => {
  const { data } = await getProjectForMetaData(id)

  return {
    description: data?.projectDescription,
    title: data?.projectName,
  }
}

export default async function Page({ params }: ProjectParams) {
  const projectId = params.id
  const { data: userData } = await getLatestUserFromSupabase()
  if (!userData) {
    return redirect("/auth/401")
  }

  const { data: projectData, exists } = await checkProjectIsAvailable(projectId)
  if (!exists) {
    notFound()
  }
  if (projectData.status !== "open") {
    return (
      <Container size="sm">
        <Stack gap="lg">
          <Title order={1} size="h2">
            寄せ書きメッセージの投稿 / 編集
          </Title>
          <div>
            <Title order={2} size="h3">
              企画名
            </Title>
            <Text>{projectData.projectName}</Text>
          </div>
          <div>
            <Alert
              color="nayuta"
              icon={<IconAlertTriangle />}
              title="受付終了"
              variant="light"
            >
              この企画は参加受付が終了しています。
            </Alert>
          </div>
          <Center>
            <LinkButton href={`/project/${projectId}`}>
              企画ページへ戻る
            </LinkButton>
          </Center>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="sm">
      <Stack gap="lg">
        <Title order={1} size="h2">
          寄せ書きメッセージの投稿 / 編集
        </Title>
        <div>
          <Title order={2} size="h3">
            企画名
          </Title>
          <Text>{projectData.projectName}</Text>
        </div>
        <div>
          <Title order={2} size="h3">
            入力フォーム
          </Title>
          <MessageForm
            projectId={projectId}
            user={{
              userId: userData.userId,
              userName: userData.userName,
            }}
          />
        </div>
      </Stack>
    </Container>
  )
}
