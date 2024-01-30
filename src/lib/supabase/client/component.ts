import type { cookies } from "next/headers"

import { env } from "@/env.mjs"
import {
  createBrowserClient as createBrowserClient_,
  createServerClient as createServerClient_,
} from "@supabase/ssr"

export function createBrowserClient() {
  return createBrowserClient_(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}

export function createServerClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient_(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
}
