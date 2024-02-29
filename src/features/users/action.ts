"use server"

import type { UserUpdate } from "@/db/schema/users"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { UNKNOWN_USER_UUID } from "@/consts"
import { db } from "@/db"
import { messages, projects, usersToJoinedProjects } from "@/db/schema"
import { type UserInsert, UserInsertSchema, users } from "@/db/schema/users"
import { signOut } from "@/features/supabase/action"
import { uploadArrayBufferIcon } from "@/features/users/avatar/upload"
import {
  getUserForMetaData,
  getUserWithoutTwitterId,
  updateUser,
} from "@/features/users/db"
import { isValidUUID } from "@/utils/uuid"
import { eq } from "drizzle-orm"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const getUserForMetaDataAction = async (userId: string) => {
  const validation = isValidUUID(userId)
  if (!validation.success) {
    return { data: null }
  }
  return await getUserForMetaData(validation.data)
}

const getUserWithoutTwitterIdAction = async (userId: string) => {
  const validation = isValidUUID(userId)
  if (!validation.success) {
    return { data: null }
  }
  return await getUserWithoutTwitterId(validation.data)
}

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

const getUserTwitterId = async (userId: string) => {
  const res = await db.query.users.findFirst({
    columns: { twitterId: true },
    where: (user, { eq }) => eq(user.userId, userId),
  })

  return res?.twitterId
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
  return { data: res?.data.path, error: null }
}

const signOutUser = async (options?: {
  revalidatePath: string | undefined
}) => {
  const { error } = await signOut({
    pathName: options?.revalidatePath,
    scope: "local",
  })
  return { error: error?.message ?? null }
}

const deleteUser = async (userId: string) => {
  await db.transaction(async (tx) => {
    await tx
      .update(projects)
      .set({ authorId: UNKNOWN_USER_UUID })
      .where(eq(projects.authorId, userId))
    await tx.transaction(async (tx2) => {
      await tx2
        .delete(usersToJoinedProjects)
        .where(eq(usersToJoinedProjects.userId, userId))
      await tx2
        .update(messages)
        .set({ authorId: UNKNOWN_USER_UUID })
        .where(eq(messages.authorId, userId))
      await tx2.delete(users).where(eq(users.userId, userId))
    })
  })
}

export {
  createNewUserProfile,
  deleteUser,
  getUserForMetaDataAction,
  getUserTwitterId,
  getUserWithoutTwitterIdAction,
  signOutUser,
  updateUserProfile,
  uploadUserAvatar,
}
