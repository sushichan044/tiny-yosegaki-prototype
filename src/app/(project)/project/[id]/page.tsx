import { db } from "@/db"
import { getCachedProject } from "@/features/projects/next"
import { Button, Title } from "@mantine/core"
import Link from "next/link"
import { notFound } from "next/navigation"

type ProjectParams = { params: { id: string } }

export async function generateStaticParams() {
  const projects = await db.query.projects.findMany({
    columns: { projectId: true },
  })
  return projects.map((p) => ({ id: p.projectId }))
}

export default async function Page({ params }: ProjectParams) {
  const { data } = await getCachedProject(params.id)
  if (!data) {
    notFound()
  }

  return (
    <>
      <div>
        <Title order={1}>{data.projectName}</Title>
        <Button
          color="nakuru"
          component={Link}
          href={`/project/${data.projectId}/post`}
        >
          参加する
        </Button>
      </div>
    </>
  )
}
