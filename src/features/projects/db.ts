import type { ProjectSelect } from "@/db/schema/projects"

import { db } from "@/db"
import { usersToJoinedProjects } from "@/db/schema"
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

type GetCreatedProjectsOfUser = (userId: string) => Promise<ProjectSelect[]>
const getCreatedProjectsOfUser: GetCreatedProjectsOfUser = async (userId) => {
  const projects = await db.query.projects.findMany({
    where: (project, { eq }) => {
      return eq(project.authorId, userId)
    },
  })
  return projects
}
type GetJoinedProjectsOfUser = (userId: string) => Promise<ProjectSelect[]>
const getJoinedProjectsOfUser: GetJoinedProjectsOfUser = async (userId) => {
  const projects = await db.transaction(async (tx) => {
    const joinedProjectIds = await tx.query.usersToJoinedProjects.findMany({
      columns: {
        projectId: true,
      },
      where: (table, { eq }) => {
        return eq(table.userId, userId)
      },
    })
    const projectIds = joinedProjectIds.map((pj) => pj.projectId)
    const projects = await tx.query.projects.findMany({
      where: (project, { inArray }) => {
        return inArray(project.projectId, projectIds)
      },
    })
    return projects
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

type JoinProjectFunction = ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => Promise<
  | {
      error: null
      success: true
    }
  | {
      error: string
      success: false
    }
>
const joinProject: JoinProjectFunction = async ({ projectId, userId }) => {
  try {
    await db
      .insert(usersToJoinedProjects)
      .values({
        projectId,
        userId,
      })
      .onConflictDoNothing({
        target: [usersToJoinedProjects.projectId, usersToJoinedProjects.userId],
      })
    return { error: null, success: true }
  } catch (error: unknown) {
    console.error(error)
    return { error: "Failed to join project", success: false }
  }
}

export {
  getCreatedProjectsOfUser,
  getJoinedProjectsOfUser,
  getProject,
  insertProject,
  joinProject,
}
