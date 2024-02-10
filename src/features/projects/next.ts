import {
  USER_CREATED_PROJECTS_CACHE_TAG,
  USER_JOINED_PROJECTS_CACHE_TAG,
} from "@/cache"
import {
  getCreatedProjectsOfUser,
  getJoinedProjectsOfUser,
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

export { getCachedCreatedProjectsOfUser, getCachedJoinedProjectsOfUser }
