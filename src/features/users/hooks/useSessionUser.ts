"use client"

import type { UserSelect } from "@/db/schema/users"

import { getUserFromSession } from "@/features/users/db"
import { useEffect, useState, useTransition } from "react"

const useSessionUser = () => {
  const [data, setData] = useState<{
    data: UserSelect | null
    isInitial: boolean
  }>({
    data: null,
    isInitial: true,
  })
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const { data } = await getUserFromSession({ useCache: true })
      setData({ data, isInitial: false })
    })
    return () => {
      setData({ data: null, isInitial: true })
    }
  }, [])

  return {
    data,
    isPending,
  }
}

export { useSessionUser }
