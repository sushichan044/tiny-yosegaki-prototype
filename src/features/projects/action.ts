"use server"

import type { ProjectInsert } from "@/db/schema/projects"

import {
  ALL_OPENED_PROJECTS_CACHE_TAG,
  USER_CREATED_PROJECTS_CACHE_TAG,
  USER_JOINED_PROJECTS_CACHE_TAG,
} from "@/cache"
import { db } from "@/db"
import { insertProject } from "@/features/projects/db"
import { joinProject as joinProjectFn } from "@/features/projects/db"
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

const joinProject = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const res = await joinProjectFn({ projectId, userId })
  if (res.success) {
    revalidateTag(USER_JOINED_PROJECTS_CACHE_TAG)
  }
  return res
}

export { createNewProject, getProjectsForCard, joinProject }
