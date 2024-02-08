import { createNewUserProfile } from "@/features/users/action"
import { uploadTwitterIcon } from "@/features/users/avatar/upload"
import { createActionClient } from "@/lib/supabase/client/action"
import { type ServerError, isEmailNotFoundError } from "@/lib/supabase/error"
import { safeParseInt } from "@/utils/number"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  // if "next" is in param, use it as the redirect URL
  // example: /auth/callback?code=xxx&next=/profile
  const next = searchParams.get("next") ?? "/"

  if (!code) {
    // failed to auth in Supabase
    const serverError: ServerError = {
      description: searchParams.get("error_description") ?? undefined,
      status: safeParseInt(searchParams.get("error_code") ?? ""),
    }
    if (isEmailNotFoundError(serverError)) {
      return NextResponse.redirect(`${origin}/auth/email-error`)
    }
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const cookieStore = cookies()
  const supabase = createActionClient(cookieStore)
  const {
    data: { session },
    error,
  } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    console.log(error)
    return NextResponse.redirect(`${origin}/auth/session-error`)
  }

  if (!session || !session.user) {
    console.error("No user in session")
    return NextResponse.redirect(`${origin}/auth/session-error`)
  }
  await createNewUserProfile({
    twitterId: session.user.user_metadata.user_name,
    userId: session.user.id,
    userName: session.user.user_metadata.full_name,
  })
  await uploadTwitterIcon(cookieStore, {
    iconSrc: session.user.user_metadata.avatar_url,
    userId: session.user.id,
  })

  return NextResponse.redirect(`${origin}${next}`)
}
