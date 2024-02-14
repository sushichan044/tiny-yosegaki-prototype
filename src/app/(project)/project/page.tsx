import ProjectCard from "@/features/projects/components/ProjectCard"
import { getCachedProjectsForCard } from "@/features/projects/next"
import { SimpleGrid } from "@mantine/core"

export default async function Page() {
  const projects = await getCachedProjectsForCard({ limit: 10 })

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
