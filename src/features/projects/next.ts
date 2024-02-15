import {
  ALL_OPENED_PROJECTS_CACHE_TAG,
  USER_CREATED_PROJECTS_CACHE_TAG,
  USER_JOINED_PROJECTS_CACHE_TAG,
} from "@/cache"
import { getProjectsForCard } from "@/features/projects/action"
import {
  getCreatedProjectsOfUser,
  getJoinedProjectsOfUser,
  getProject,
} from "@/features/projects/db"
import { unstable_cache } from "next/cache"

const getCachedCreatedProjectsOfUser = unstable_cache(
  async (userId: string) => getCreatedProjectsOfUser(userId),
  ["getCreatedProjectsOfUser"],
  {
    tags: [USER_CREATED_PROJECTS_CACHE_TAG],
  },
)
const getCachedJoinedProjectsOfUser = unstable_cache(
  async (userId: string) => getJoinedProjectsOfUser(userId),
  ["getJoinedProjectsOfUser"],
  {
    tags: [USER_JOINED_PROJECTS_CACHE_TAG],
  },
)

const getCachedProjectsForCard = unstable_cache(
  async ({ limit, offset }: { limit?: number; offset?: number }) =>
    getProjectsForCard({ limit, offset }),
  ["getProjectsForCard"],
  {
    tags: [ALL_OPENED_PROJECTS_CACHE_TAG],
  },
)

const getCachedProject = unstable_cache(
  async (projectId: string) => getProject(projectId),
  ["getProject"],
)

export {
  getCachedCreatedProjectsOfUser,
  getCachedJoinedProjectsOfUser,
  getCachedProject,
  getCachedProjectsForCard,
}
