import type { Metadata } from "next"

import { getProjectsForCard } from "@/features/projects/action"
import ProjectCard from "@/features/projects/components/ProjectCard"
import { Center, SimpleGrid, Space, Title } from "@mantine/core"

export const metadata: Metadata = {
  title: "寄せ書き企画一覧",
}

export default async function Page() {
  const projects = await getProjectsForCard({ limit: 10 })
  return (
    <>
      <Center>
        <Title order={1} size="h2">
          寄せ書き企画を探す
        </Title>
      </Center>
      <Space h="lg" />
      <SimpleGrid
        cols={{
          base: 1,
          md: 2,
        }}
        spacing="md"
        verticalSpacing="md"
      >
        {projects.map((project) => {
          return <ProjectCard key={project.projectId} project={project} />
        })}
      </SimpleGrid>
    </>
  )
}
