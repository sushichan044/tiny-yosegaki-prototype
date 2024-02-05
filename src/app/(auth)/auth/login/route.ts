import { getSupaBaseAuthUser, signIn } from "@/features/supabase/action"
import { NextResponse } from "next/server"

export async function GET() {
  const {
    data: { user },
  } = await getSupaBaseAuthUser()
  if (user) {
    return NextResponse.redirect("/")
  }

  await signIn()
}
