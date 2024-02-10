import { getProject } from "@/features/projects/db"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const project = await getProject(params.id)
  if (!project) {
    notFound()
  }

  return (
    <>
      <div>
        <Title order={1}>{project.projectName}</Title>
      </div>
    </>
  )
}
