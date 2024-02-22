import type { ProjectParams } from "@/app/(layout)/(auth)/project/[id]/manage/_template"

import { checkProjectAuthorIsUser } from "@/features/projects/action"
import ManageTab from "@/features/projects/components/ManageTab"
import { getProject } from "@/features/projects/db"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { notFound, redirect } from "next/navigation"

export default async function Page({ params }: ProjectParams) {
  const projectId = params.id
  const { data: userData } = await getLatestUserFromSupabase()
  if (!userData) {
    // navigate to project not available page
    redirect("/auth/401")
  }

  const isCorrectUser = await checkProjectAuthorIsUser({
    projectId,
    userId: userData.userId,
  })
  if (!isCorrectUser) {
    // navigate to project not available page
    redirect("/auth/403")
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
      <div className="flex-1">gahaha</div>
    </div>
  )
}
