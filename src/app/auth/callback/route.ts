import { upsertUser } from "@/features/auth/db"
import { createActionClient } from "@/lib/supabase/client/action"
import { SessionNotFoundError } from "@/lib/supabase/error"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  // if "next" is in param, use it as the redirect URL
  // example: /auth/callback?code=xxx&next=/profile
  const next = searchParams.get("next") ?? "/"
  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const cookieStore = cookies()
  const supabase = createActionClient(cookieStore)
  const {
    data: { session },
    error,
  } = await supabase.auth.exchangeCodeForSession(code)
  if (error || !session) {
    const err = error ?? new SessionNotFoundError()
    console.error(err)
    return NextResponse.redirect(`${origin}/auth/session-error`)
  }

  if (!session.user) {
    console.error("No user in session")
    return NextResponse.redirect(`${origin}/auth/session-error`)
  }

  await upsertUser({
    avatarUrl: session.user.user_metadata.avatar_url,
    createdAt: new Date(session.user.created_at),
    twitterDisplayName: session.user.user_metadata.name,
    twitterName: session.user.user_metadata.user_name,
    updatedAt: session.user.updated_at
      ? new Date(session.user.updated_at)
      : new Date(),
  })

  return NextResponse.redirect(`${origin}${next}`)
}
