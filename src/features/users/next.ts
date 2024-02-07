import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { getUser } from "@/features/users/db"
import { unstable_cache } from "next/cache"

const getCachedUser = unstable_cache(
  async (userId?: string | undefined) => getUser(userId),
  [`currentUser`],
  {
    tags: [USER_PROFILE_CACHE_TAG],
  },
)

export { getCachedUser }
