"use server"

import type { UserUpdate } from "@/db/schema/users"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { db } from "@/db"
import { type UserInsert, UserInsertSchema, users } from "@/db/schema/users"
import { signOut } from "@/features/supabase/action"
import { uploadArrayBufferIcon } from "@/features/users/avatar/upload"
import { updateUser } from "@/features/users/db"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const createNewUserProfile = async (user: UserInsert) => {
  const res = await UserInsertSchema.safeParseAsync(user)
  if (!res.success) {
    return { error: "Invalid user" }
  }

  try {
    await db.insert(users).values(res.data).onConflictDoNothing({
      target: users.userId,
    })
  } catch (error: unknown) {
    console.error(error)
    return { error: "Failed to insert user" }
  }
  return { error: null }
}

const updateUserProfile = async (user: UserUpdate) => {
  const res = await updateUser(user)
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
  revalidatePath("/settings", "layout")
  return { data: res.data.path, error: null }
}

const signOutUser = async (options?: {
  revalidatePath: string | undefined
}) => {
  return await signOut({
    pathName: options?.revalidatePath,
    scope: "local",
  })
}

export {
  createNewUserProfile,
  signOutUser,
  updateUserProfile,
  uploadUserAvatar,
}
