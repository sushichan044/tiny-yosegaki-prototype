"use client"

import { createBrowserClient } from "@/lib/supabase/client/component"
import { useCallback } from "react"

const useAuth = () => {
  const client = createBrowserClient()

  const signOut = useCallback(async () => {
    return client.auth.signOut()
  }, [client])

  const signInWithTwitter = useCallback(
    async (redirectTo?: string) => {
      const { data, error } = await client.auth.signInWithOAuth({
        options: {
          redirectTo,
        },
        provider: "twitter",
      })
      if (error) {
        console.error(error)
        return error
      }
      return data
    },
    [client],
  )

  return { signInWithTwitter, signOut }
}

export { useAuth }
