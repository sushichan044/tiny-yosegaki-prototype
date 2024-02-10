"use server"

import type { ProjectInsert } from "@/db/schema/projects"

import { insertProject } from "@/features/projects/db"

const createNewProject = async (project: ProjectInsert) => {
  return await insertProject(project)
}

export { createNewProject }
