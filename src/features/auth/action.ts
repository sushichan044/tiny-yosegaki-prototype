"use server"

import { createActionClient } from "@/lib/supabase/client/action"
import { cookies } from "next/headers"

const signIn = async (redirectTo?: string | undefined) => {
  const cookie = cookies()
  const supabase = createActionClient(cookie)
  return await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: redirectTo,
    },
    provider: "twitter",
  })
}

export { signIn }
