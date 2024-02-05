import { db } from "@/db"

const getProject = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  return project
}

export { getProject }
