import type { UserSelect } from "@/db/schema/users"

import { getUserFromSession } from "@/features/users/db"
import { useServerAction } from "@/hooks/useServerAction"
import { useEffect, useState } from "react"

const useSessionUser = () => {
  const [user, setUser] = useState<UserSelect | null>(null)
  const [isInitial, setIsInitial] = useState(true)
  const [runAction, isPending] = useServerAction(() =>
    getUserFromSession({ useCache: true }),
  )

  useEffect(() => {
    //@ts-expect-error no arg is needed
    runAction()
      .then((data) => {
        if (data?.data) {
          setUser(data.data)
        }
        setIsInitial(false)
      })
      .catch((e) => {
        console.error(e)
        setIsInitial(false)
      })
    return () => {
      setUser(null)
      setIsInitial(true)
    }
    // do not pass runAction as a dependency
    // it will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isInitial,
    isPending,
    user,
  }
}

export { useSessionUser }
