"use server"

import type { AuthError } from "@supabase/supabase-js"

import { createActionClient } from "@/lib/supabase/client/action"
import { getSiteUrl } from "@/utils/url"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignInFunction = (
  redirectTo?: string | undefined,
) => Promise<AuthError | never>

type SignOutFunction = () => ReturnType<
  ReturnType<typeof createActionClient>["auth"]["signOut"]
>

type GetSessionFunction = () => ReturnType<
  ReturnType<typeof createActionClient>["auth"]["getSession"]
>

type GetUserFunction = () => ReturnType<
  ReturnType<typeof createActionClient>["auth"]["getUser"]
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

  const result = await supabase.auth.signOut()
  if (result.error) {
    console.error(result.error)
  }

  return result
}

const getSession: GetSessionFunction = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const result = await supabase.auth.getSession()
  if (result.error) {
    console.error(result.error)
  }

  return result
}

const getUser: GetUserFunction = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const result = await supabase.auth.getUser()
  if (result.error) {
    console.error(result.error)
  }

  return result
}

export { getSession, getUser, signIn, signOut }
