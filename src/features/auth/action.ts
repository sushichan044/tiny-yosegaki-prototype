"use server"

import type { AuthError } from "@supabase/supabase-js"

import { createActionClient } from "@/lib/supabase/client/action"
import { getSiteUrl } from "@/utils/url"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignInFunction = (
  redirectTo?: string | undefined,
) => Promise<AuthError | void>

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

export { signIn }
