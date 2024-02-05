import { db } from "@/db"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const project = await db.query.projects.findFirst({
    where: (project, { eq }) => {
      return eq(project.projectId, params.id)
    },
  })
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
