import MessageForm from "@/features/messages/components/MessageForm"
import { checkProjectIsAvailable } from "@/features/projects/db"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Skeleton, Title } from "@mantine/core"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const projectId = params.id
  const { data: userData } = await getLatestUserFromSupabase()
  if (!userData) {
    return <>login required</>
  }

  const { data: projectData, exists } = await checkProjectIsAvailable(projectId)
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
      <Suspense fallback={<Skeleton />}>
        <MessageForm
          projectId={projectId}
          user={{
            userId: userData.userId,
            userName: userData.userName,
          }}
        />
      </Suspense>
    </>
  )
}
