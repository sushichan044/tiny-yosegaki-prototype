"use server"

import type { UserInsert, UserUpdate } from "@/db/schema/users"

import { db } from "@/db"
import {
  UserInsertSchema,
  type UserSelect,
  UserUpdateSchema,
  users,
} from "@/db/schema/users"
import { getCachedUserFromId } from "@/features/users/next"
import { createActionClient } from "@/lib/supabase/client/action"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import "server-only"

type GetUserFromSupabaseFunction = (options?: {
  useCache?: boolean
}) => Promise<{ data: UserSelect | null }>
type GetUserFromIdFunction = (
  userId: string,
) => Promise<{ data: UserSelect | null }>

/**
 * Retrieves a user from the database based on the provided userId.
 * If userId is not provided, it retrieves the currently authenticated user.
 * @param userId - The ID of the user to retrieve.
 * @returns An object containing the retrieved user data, or null if the user is not found.
 */
const getLatestUserFromSupabase: GetUserFromSupabaseFunction = async () => {
  const supabase = createActionClient(cookies())
  const {
    data: { user: SupaBaseUser },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error(error)
    return { data: null }
  }
  if (!SupaBaseUser) {
    return { data: null }
  }

  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => {
      return eq(user.userId, SupaBaseUser.id)
    },
  })
  return { data: dbUser ?? null }
}

/**
 * Retrieves the user from the current session.
 * Do not use this function on critical paths like user profile pages.
 * @returns {Promise<{ data: User | null }>} The user data or null if not found.
 */
const getUserFromSession: GetUserFromSupabaseFunction = async (options) => {
  const useCache = options?.useCache ?? false
  const supabase = createActionClient(cookies())
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    console.error(error)
    return { data: null }
  }
  if (!session) {
    // console.error("No session")
    return { data: null }
  }

  if (useCache) {
    return await getCachedUserFromId(session.user.id)
  }

  return await getUserFromId(session.user.id)
}

const getUserFromId: GetUserFromIdFunction = async (userId) => {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => {
      return eq(user.userId, userId)
    },
  })
  return { data: user ?? null }
}

const getUserWithoutTwitterId = async (userId: string) => {
  const user = await db.query.users.findFirst({
    columns: {
      twitterId: false,
    },
    where: (user, { eq }) => {
      return eq(user.userId, userId)
    },
  })
  return { data: user ?? null }
}

const getUserForMetaData = async (userId: string) => {
  const user = await db.query.users.findFirst({
    columns: {
      userName: true,
    },
    where: (user, { eq }) => {
      return eq(user.userId, userId)
    },
  })
  return { data: user ?? null }
}

const getAllUserIds = async () => {
  const users = await db.query.users.findMany({
    columns: {
      userId: true,
    },
  })
  return users.map((u) => u.userId)
}

type UpsertUserFunction = (
  user: UserInsert,
) => Promise<{ error: string | null }>
const upsertUser: UpsertUserFunction = async (user) => {
  const res = await UserInsertSchema.safeParseAsync(user)
  if (!res.success) {
    return { error: "Invalid user" }
  }

  try {
    await db
      .insert(users)
      .values(res.data)
      .onConflictDoUpdate({
        set: {
          showTwitterOnProfile: res.data.showTwitterOnProfile,
          twitterId: res.data.twitterId,
          updatedAt: new Date(),
          userName: res.data.userName,
        },
        target: users.userId,
      })
  } catch (err) {
    console.error("upsertUser", err)
    return { error: "Failed to upsert user" }
  }

  return { error: null }
}

const updateUser = async (user: UserUpdate) => {
  const res = await UserUpdateSchema.safeParseAsync(user)
  if (!res.success) {
    return { error: "Invalid user update" }
  }
  try {
    await db
      .update(users)
      .set({
        showTwitterOnProfile: res.data.showTwitterOnProfile,
        updatedAt: new Date(),
        userName: res.data.userName,
      })
      .where(eq(users.userId, res.data.userId))
  } catch (err) {
    console.error("updateUser", err)
    return { error: "Failed to update user" }
  }

  return { error: null }
}

export {
  getAllUserIds,
  getLatestUserFromSupabase,
  getUserForMetaData,
  getUserFromId,
  getUserFromSession,
  getUserWithoutTwitterId,
  updateUser,
  upsertUser,
}
