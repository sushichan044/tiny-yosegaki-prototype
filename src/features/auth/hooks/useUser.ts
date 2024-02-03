"use client"

import type { User } from "@supabase/supabase-js"

import { createBrowserClient } from "@/lib/supabase/client/component"
import { useState } from "react"

const useUser = () => {
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const client = createBrowserClient()
  client.auth
    .getUser()
    .then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }
      setUser(data.user)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      setIsPending(false)
    })

  return { isPending, user }
}

export { useUser }
