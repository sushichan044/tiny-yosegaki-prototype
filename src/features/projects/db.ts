import type { ProjectSelect } from "@/db/schema/projects"

import { db } from "@/db"
import {
  type ProjectInsert,
  ProjectInsertSchema,
  projects,
} from "@/db/schema/projects"
import "server-only"

const getProject = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  return project
}

type GetProjectsOfUser = (userId: string) => Promise<ProjectSelect[]>
const getProjectsOfUser: GetProjectsOfUser = async (userId) => {
  const projects = await db.query.projects.findMany({
    where: (project, { eq }) => {
      return eq(project.authorId, userId)
    },
  })
  return projects
}

type InsertProjectFunction = (project: ProjectInsert) => Promise<
  | {
      error: null
      success: true
    }
  | {
      error: string
      success: false
    }
>
const insertProject: InsertProjectFunction = async (project) => {
  const res = await ProjectInsertSchema.safeParseAsync(project)
  if (!res.success) {
    return {
      error: "Zod parse failed: Invalid project",
      success: false,
    }
  }

  try {
    await db.insert(projects).values(project).onConflictDoNothing({
      target: projects.projectId,
    })
    return {
      error: null,
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      error: "Failed to insert project",
      success: false,
    }
  }
}

export { getProject, getProjectsOfUser, insertProject }
