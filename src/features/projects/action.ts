"use server"

import type { ProjectUpdate } from "@/db/schema/projects"

import {
  ALL_OPENED_PROJECTS_CACHE_TAG,
  USER_CREATED_PROJECTS_CACHE_TAG,
  revalidateProjectWithId,
} from "@/cache"
import { db } from "@/db"
import {
  type ProjectInsert,
  ProjectUpdateSchema,
  projects,
} from "@/db/schema/projects"
import { __deleteProject, insertProject } from "@/features/projects/db"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"

const createNewProject = async (project: ProjectInsert) => {
  const res = await insertProject(project)
  if (res.success) {
    revalidateTag(USER_CREATED_PROJECTS_CACHE_TAG)
    if (project.status === "open") {
      revalidateTag(ALL_OPENED_PROJECTS_CACHE_TAG)
    }
  }
  return res
}

type UpdateProjectFunction = (project: ProjectUpdate) => Promise<
  | {
      error: null
      success: true
    }
  | {
      error: string
      success: false
    }
>
const updateProject: UpdateProjectFunction = async (project) => {
  const res = await ProjectUpdateSchema.safeParseAsync(project)
  if (!res.success) {
    return {
      error: "Zod parse failed: Invalid project",
      success: false,
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt: _, ...rest } = res.data

  try {
    await db
      .update(projects)
      .set({ updatedAt: new Date(), ...rest })
      .where(eq(projects.projectId, project.projectId))
    return {
      error: null,
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      error: "Failed to update project",
      success: false,
    }
  }
}

type GetProJectsForCardOptions = {
  limit?: number
  offset?: number
}

const getProjectsForCard = async (
  options?: GetProJectsForCardOptions | undefined,
) => {
  const projects = await db.query.projects.findMany({
    columns: {
      hasThumbnail: true,
      projectDescription: true,
      projectId: true,
      projectName: true,
    },
    limit: options?.limit,
    offset: options?.offset,
    where: (project, { eq }) => {
      return eq(project.status, "open")
    },
    with: {
      author: {
        columns: {
          userId: true,
          userName: true,
        },
      },
      joinedUsers: {
        columns: {
          userId: true,
        },
      },
    },
  })
  return projects
}

const checkProjectIsAvailable = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    columns: {
      projectName: true,
      status: true,
    },
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  if (!project) {
    return {
      data: null,
      exists: false as const,
    }
  }
  return {
    data: project,
    exists: true as const,
  }
}

const checkProjectAuthorIsUser = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const project = await db.query.projects.findFirst({
    columns: {
      authorId: true,
    },
    where: (project, { eq }) => {
      return eq(project.projectId, projectId)
    },
  })
  if (!project) {
    return false
  }
  return project.authorId === userId
}

// const getProjectForManagePage = async (projectId: string) => {
//   const project = await db.query.projects.findFirst({
//     where: (project, { eq }) => {
//       return eq(project.projectId, projectId)
//     },
//     with: {
//       messages: {
//         orderBy: (message, { desc }) => {
//           return desc(message.updatedAt)
//         },
//       },
//     },
//   })

//   return project
// }

const deleteProject = async (projectId: string) => {
  await __deleteProject(projectId)
  revalidateProjectWithId(projectId)
  revalidateTag(USER_CREATED_PROJECTS_CACHE_TAG)
  revalidateTag(ALL_OPENED_PROJECTS_CACHE_TAG)
}

export {
  checkProjectAuthorIsUser,
  checkProjectIsAvailable,
  createNewProject,
  deleteProject,
  // getProjectForManagePage,
  getProjectsForCard,
  updateProject,
}
