import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { getUser } from "@/features/users/db"
import { unstable_cache } from "next/cache"

const getCachedUser = () => {
  return unstable_cache(
    async () => {
      return await getUser()
    },
    [`currentUser`],
    {
      tags: [USER_PROFILE_CACHE_TAG],
    },
  )()
}
export { getCachedUser }
