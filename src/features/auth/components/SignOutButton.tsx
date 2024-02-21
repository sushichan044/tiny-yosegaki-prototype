"use client"

import { signOutUser } from "@/features/users/action"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false)
  const handleClick = async () => {
    setIsPending(true)
    const { error } = await signOutUser()
    setIsPending(false)
    if (error) {
      notifications.show({
        color: "nayuta",
        message: error,
        title: "ログアウトに失敗しました",
      })
    }
  }

  return (
    <Button loading={isPending} onClick={handleClick}>
      <span>ログアウト</span>
    </Button>
  )
}

export default SignOutButton
