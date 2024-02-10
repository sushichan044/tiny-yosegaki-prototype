import type { cookies } from "next/headers"

import { env } from "@/env.mjs"
import { type CookieOptions, createServerClient } from "@supabase/ssr"

export function createActionClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
        set(
          name: string,
          value: string,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          { httpOnly, secure, ...rest }: CookieOptions,
        ) {
          cookieStore.set({
            httpOnly: true,
            name,
            secure: true,
            value,
            ...rest,
          })
        },
      },
    },
  )
}
