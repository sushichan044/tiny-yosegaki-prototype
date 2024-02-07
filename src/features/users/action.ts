"use server"

import type { UserUpdate } from "@/db/schema/users"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { upsertUser } from "@/features/users/db"
import { revalidateTag } from "next/cache"

const updateUserProfile = async (user: UserUpdate) => {
  const res = await upsertUser(user)
  revalidateTag(USER_PROFILE_CACHE_TAG)
  return res
}

export { updateUserProfile }
