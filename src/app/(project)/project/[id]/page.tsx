import { getCachedProject } from "@/features/projects/next"
import { Button, Title } from "@mantine/core"
import Link from "next/link"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export default async function Page({ params }: ProjectParams) {
  const project = await getCachedProject(params.id)
  if (!project) {
    notFound()
  }

  return (
    <>
      <div>
        <Title order={1}>
          {project.projectName}
        </Title>
        <Button
          color="nakuru"
          component={Link}
          href={`/project/${project.projectId}/post`}
        >
          参加する
        </Button>
      </div>
    </>
  )
}
