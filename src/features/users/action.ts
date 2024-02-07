"use server"

import type { UserUpdate } from "@/db/schema/users"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { signOut } from "@/features/supabase/action"
import { upsertUser } from "@/features/users/db"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

const updateUserProfile = async (user: UserUpdate) => {
  const res = await upsertUser(user)
  revalidateTag(USER_PROFILE_CACHE_TAG)
  revalidatePath("/settings")
  return res
}

const signOutUser = async () => {
  const { error } = await signOut()
  if (!error) {
    revalidateTag(USER_PROFILE_CACHE_TAG)
    redirect("/")
  }
  return { error }
}

export { signOutUser, updateUserProfile }
