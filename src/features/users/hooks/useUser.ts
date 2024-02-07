import type { UserSelect } from "@/db/schema/users"

import { getUser } from "@/features/users/db"
import { useState } from "react"

const useUser = () => {
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState<UserSelect | null>(null)

  getUser()
    .then((res) => {
      if (res.data) {
        setUser(res.data)
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      setIsPending(false)
    })

  return { isPending, user }
}

export { useUser }
