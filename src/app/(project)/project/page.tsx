import { getProjectsForCard } from "@/features/projects/action"
import ProjectCard from "@/features/projects/components/ProjectCard"
import { SimpleGrid } from "@mantine/core"

export default async function Page() {
  const projects = await getProjectsForCard({ limit: 10 })
  return (
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
  )
}
