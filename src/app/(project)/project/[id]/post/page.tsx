import MessageForm from "@/features/messages/components/MessageForm"
import { cachedCheckProjectIsAvailable } from "@/features/projects/next"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const projectId = params.id
  const { data: userData } = await getLatestUserFromSupabase()
  if (!userData) {
    return <>login required</>
  }

  const { data: projectData, exists } =
    await cachedCheckProjectIsAvailable(projectId)
  if (!exists) {
    notFound()
  }
  if (projectData.status !== "open") {
    // navigate to project not available page
    console.debug("project not available")
    notFound()
  }

  return (
    <>
      <Title
        order={1}
      >{`${projectData.projectName}にメッセージを投稿する`}</Title>
      <MessageForm
        projectId={projectId}
        user={{
          userId: userData.userId,
          userName: userData.userName,
        }}
      />
    </>
  )
}
