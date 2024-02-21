import type { ProjectParams } from "@/app/(layout)/(auth)/project/[id]/manage/_template"
import type { Metadata } from "next"

import { checkProjectAuthorIsUser } from "@/features/projects/action"
import ManageTab from "@/features/projects/components/ManageTab"
import ProjectManageForm from "@/features/projects/components/ProjectManageForm"
import { getProject, getProjectForMetaData } from "@/features/projects/db"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Space, Title } from "@mantine/core"
import { notFound } from "next/navigation"

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
    // navigate to project not available page
    notFound()
  }

  const isCorrectUser = await checkProjectAuthorIsUser({
    projectId,
    userId: userData.userId,
  })
  if (!isCorrectUser) {
    // navigate to project not available page
    notFound()
  }

  const { data } = await getProject(projectId)
  if (!data) {
    // navigate to project not available page
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside>
        <ManageTab projectId={params.id} />
      </aside>
      <div className="flex-1">
        <article>
          <Title order={1}>企画の管理</Title>
          <Space h="xl" />
          <ProjectManageForm project={data} />
        </article>
      </div>
    </div>
  )
}
