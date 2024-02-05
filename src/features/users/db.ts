"use server"

import type { UserSelect } from "@/db/schema/users"

import { db } from "@/db"
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

export { getUser }
