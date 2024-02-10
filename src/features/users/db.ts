"use server"

import type { UserInsert } from "@/db/schema/users"

import { db } from "@/db"
import { UserInsertSchema, type UserSelect, users } from "@/db/schema/users"
import { createActionClient } from "@/lib/supabase/client/action"
import { cookies } from "next/headers"

type GetUserFromSupabaseFunction = () => Promise<{ data: UserSelect | null }>
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
const getUserFromSession: GetUserFromSupabaseFunction = async () => {
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
    return { data: null }
  }

  const dbUser = await db.query.users.findFirst({
    where: (user, { eq }) => {
      return eq(user.userId, session.user.id)
    },
  })
  return { data: dbUser ?? null }
}

const getUserFromId: GetUserFromIdFunction = async (userId) => {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => {
      return eq(user.userId, userId)
    },
  })
  return { data: user ?? null }
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

export {
  getLatestUserFromSupabase,
  getUserFromId,
  getUserFromSession,
  upsertUser,
}
