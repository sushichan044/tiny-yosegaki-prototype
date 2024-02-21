"use server"

import type { AuthError } from "@supabase/supabase-js"

import { USER_PROFILE_CACHE_TAG } from "@/cache"
import { createActionClient } from "@/lib/supabase/client/action"
import { getSiteUrl } from "@/utils/url"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignInFunction = (
  redirectTo?: string | undefined,
) => Promise<AuthError | void>

type SignOutFunction = (
  options?: Parameters<
    ReturnType<typeof createActionClient>["auth"]["signOut"]
  >[0] & {
    pathName?: string | undefined
  },
) => ReturnType<ReturnType<typeof createActionClient>["auth"]["signOut"]>

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

const signOut: SignOutFunction = async (options) => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const scope = options?.scope ?? "local"
  const result = await supabase.auth.signOut({ scope })
  if (result.error) {
    console.error(result.error)
  }
  revalidateTag(USER_PROFILE_CACHE_TAG)
  revalidatePath("/", "layout")
  if (options?.pathName) {
    revalidatePath(options.pathName, "layout")
  }

  return result
}

const getSupaBaseAuthUser: GetUserFunction = async () => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)

  const result = await supabase.auth.getUser()
  if (result.error) {
    console.error(result.error)
  }

  return result
}

export { getSupaBaseAuthUser, signIn, signOut }
