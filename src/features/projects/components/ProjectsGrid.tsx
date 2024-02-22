import { getProjectsForCard } from "@/features/projects/action"
import ProjectCard from "@/features/projects/components/ProjectCard"
import { SimpleGrid } from "@mantine/core"

const ProjectsGrid = async () => {
  const projects = await getProjectsForCard({ limit: 10 })

  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
      }}
      spacing="md"
      verticalSpacing="md"
    >
      {projects.map((project) => (
        <ProjectCard key={project.projectId} project={project} />
      ))}
    </SimpleGrid>
  )
}

export default ProjectsGrid
