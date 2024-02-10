"use server"

import type { ProjectInsert } from "@/db/schema/projects"

import {
  USER_CREATED_PROJECTS_CACHE_TAG,
  USER_JOINED_PROJECTS_CACHE_TAG,
} from "@/cache"
import { insertProject } from "@/features/projects/db"
import { joinProject as joinProjectFn } from "@/features/projects/db"
import { revalidateTag } from "next/cache"

const createNewProject = async (project: ProjectInsert) => {
  const res = await insertProject(project)
  if (res.success) {
    revalidateTag(USER_CREATED_PROJECTS_CACHE_TAG)
  }
  return res
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

export { createNewProject, joinProject }
