import { getProject } from "@/features/projects/db"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const project = await getProject(params.id)
  if (!project) {
    notFound()
  }

  return <></>
}
