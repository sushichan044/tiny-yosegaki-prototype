import { getUser, signIn } from "@/features/supabase/action"
import { NextResponse } from "next/server"

export async function GET() {
  const {
    data: { user },
  } = await getUser()
  if (user) {
    return NextResponse.redirect("/")
  }

  await signIn()
}
