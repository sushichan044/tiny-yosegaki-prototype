import { getSession, signIn } from "@/features/auth/action"
import { NextResponse } from "next/server"

export async function GET() {
  const {
    data: { session },
  } = await getSession()

  if (session?.user) {
    return NextResponse.redirect("/")
  }
  await signIn()
}
