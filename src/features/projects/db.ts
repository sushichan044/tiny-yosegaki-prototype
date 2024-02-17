import type { ProjectSelect } from "@/db/schema/projects"

import { db } from "@/db"
import { messages, usersToJoinedProjects } from "@/db/schema"
import {
  type ProjectInsert,
  ProjectInsertSchema,
  projects,
} from "@/db/schema/projects"
import { eq } from "drizzle-orm"
import "server-only"

const getProject = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  return { data: project ?? null }
}

const getProjectForMetaData = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    columns: {
      projectDescription: true,
      projectName: true,
    },
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  return { data: project ?? null }
}

export type JoinedProjectSelect = ProjectSelect & {
  author: {
    userName: string
  }
  messages: {
    authorId: string
    messageId: string
  }[]
}

export type CreatedProjectSelect = ProjectSelect

type GetCreatedProjectsOfUserFunction = (
  userId: string,
) => Promise<CreatedProjectSelect[]>
const getCreatedProjectsOfUser: GetCreatedProjectsOfUserFunction = async (
  userId,
) => {
  const projects = await db.query.projects.findMany({
    orderBy: (project, { desc }) => [
      desc(project.updatedAt),
      desc(project.createdAt),
    ],
    where: (project, { eq }) => {
      return eq(project.authorId, userId)
    },
  })
  return projects
}

type GetJoinedProjectsOfUserFunction = (
  userId: string,
) => Promise<JoinedProjectSelect[]>

const getJoinedProjectsOfUser: GetJoinedProjectsOfUserFunction = async (
  userId,
) => {
  const projects = await db.transaction(async (tx) => {
    const joinedProjectIds = await tx.query.usersToJoinedProjects.findMany({
      columns: {
        projectId: true,
      },
      where: (table, { eq }) => {
        return eq(table.userId, userId)
      },
    })

    // Early return if the user has not joined any projects
    // because inArray() will throw an error if the array is empty
    if (joinedProjectIds.length === 0) {
      return []
    }

    const projectIds = joinedProjectIds.map((pj) => pj.projectId)
    const projects = await tx.query.projects.findMany({
      where: (project, { inArray }) => {
        return inArray(project.projectId, projectIds)
      },
      with: {
        author: {
          columns: {
            userName: true,
          },
        },
        messages: {
          columns: {
            authorId: true,
            messageId: true,
          },
          limit: 1,
          where: (message, { eq }) => {
            return eq(message.authorId, userId)
          },
        },
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

const __deleteProject = async (projectId: string) => {
  await db.transaction(async (tx) => {
    await tx
      .delete(usersToJoinedProjects)
      .where(eq(usersToJoinedProjects.projectId, projectId))
    await tx.delete(messages).where(eq(messages.projectId, projectId))
    await tx.delete(projects).where(eq(projects.projectId, projectId))
  })
}

export {
  __deleteProject,
  getCreatedProjectsOfUser,
  getJoinedProjectsOfUser,
  getProject,
  getProjectForMetaData,
  insertProject,
  joinProject,
}
