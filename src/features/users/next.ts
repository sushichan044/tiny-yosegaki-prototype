import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { getUserFromId } from "@/features/users/db"
import { unstable_cache } from "next/cache"

const getCachedUserFromId = unstable_cache(
  async (userId: string) => getUserFromId(userId),
  ["getUserFromId"],
  {
    revalidate: 60,
    tags: [USER_PROFILE_CACHE_TAG],
  },
)

export { getCachedUserFromId }
