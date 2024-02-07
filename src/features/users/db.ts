"use server"

import type { UserUpdate } from "@/db/schema/users"

import { db } from "@/db"
import { type UserSelect, UserUpdateSchema, users } from "@/db/schema/users"
import { createActionClient } from "@/lib/supabase/client/action"
import { cookies } from "next/headers"

type GetUserFunction = (
  userId?: string | undefined,
) => Promise<{ data: UserSelect | null }>

const getUser: GetUserFunction = async (userId?: string | undefined) => {
  if (userId != null) {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => {
        return eq(user.userId, userId)
      },
    })
    return { data: user ?? null }
  }

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

type UpsertUserFunction = (
  user: UserUpdate,
) => Promise<{ error: string | null }>
const upsertUser: UpsertUserFunction = async (user) => {
  const res = await UserUpdateSchema.safeParseAsync(user)
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

export { getUser, upsertUser }
