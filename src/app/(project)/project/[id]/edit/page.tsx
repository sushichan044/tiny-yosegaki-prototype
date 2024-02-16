import type { Metadata } from "next"

import { checkProjectAuthorIsUser } from "@/features/projects/action"
import { getProjectForMetaData } from "@/features/projects/db"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { notFound } from "next/navigation"

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

  return <>edit project</>
}
