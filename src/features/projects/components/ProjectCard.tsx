import type { getProjectsForCard } from "@/features/projects/action"

import { Card } from "@mantine/core"
import Link from "next/link"

type ProjectCardProps = {
  project: Awaited<ReturnType<typeof getProjectsForCard>>[number]
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card component={Link} href={`/project/${project.projectId}`}>
      <h2>{project.projectName}</h2>
      <p>{project.projectDescription}</p>
    </Card>
  )
}

export default ProjectCard
