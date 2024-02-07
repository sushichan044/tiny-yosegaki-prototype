"use server"

import type { UserUpdate } from "@/db/schema/users"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { signOut } from "@/features/supabase/action"
import { uploadArrayBufferIcon } from "@/features/users/avatar/upload"
import { upsertUser } from "@/features/users/db"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const updateUserProfile = async (user: UserUpdate) => {
  const res = await upsertUser(user)
  revalidateTag(USER_PROFILE_CACHE_TAG)
  revalidatePath("/settings")
  return res
}

const uploadUserAvatar = async ({
  formData,
  userId,
}: {
  formData: FormData
  userId: string
}) => {
  const cookie = cookies()
  const file = formData.get("avatar")
  if (!(file instanceof File)) {
    return { data: null, error: "File is not instance of File" }
  }
  const arrayBuffer = await file.arrayBuffer()
  const res = await uploadArrayBufferIcon(cookie, { file: arrayBuffer, userId })
  if (res.error) {
    return { data: null, error: res.error.message }
  }
  revalidatePath("/settings","layout")
  return { data: res.data.path, error: null }
}

const signOutUser = async () => {
  const { error } = await signOut()
  if (!error) {
    revalidateTag(USER_PROFILE_CACHE_TAG)
    redirect("/")
  }
  return { error }
}

export { signOutUser, updateUserProfile, uploadUserAvatar }
