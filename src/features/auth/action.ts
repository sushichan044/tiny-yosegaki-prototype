"use server"

import type { AuthError, Session } from "@supabase/supabase-js"

import { createActionClient } from "@/lib/supabase/client/action"
import { getSiteUrl } from "@/utils/url"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignInFunction = (
  redirectTo?: string | undefined,
) => Promise<AuthError | void>

type SignOutFunction = () => Promise<AuthError | void>

type GetSessionFunction = () => Promise<
  | {
      error: AuthError
      session: null
    }
  | {
      error: null
      session: Session | null
    }
>

const signIn: SignInFunction = async (redirectTo) => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const authCallbackUrl = new URL(
    "/auth/callback",
    getSiteUrl({ addTrailingSlash: false }),
  )
  if (redirectTo) {
    authCallbackUrl.searchParams.append("next", redirectTo)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: authCallbackUrl.toString(),
    },
    provider: "twitter",
  })
  if (error) {
    console.error(error)
    return error
  }

  return redirect(data.url)
}

const signOut: SignOutFunction = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    return error
  }
}

const getSession: GetSessionFunction = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    console.error(error)
    return { error, session: null }
  }

  return {
    error: null,
    session: session,
  }
}

const getUser = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
  }
  return { data, error }
}

export { getSession, getUser, signIn, signOut }
