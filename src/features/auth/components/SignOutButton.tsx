"use client"

import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"

const SignOutButton = () => {
  const [runAction, isPending] = useServerAction(signOutUser, (res) => {
    if (res?.error) {
      notifications.show({
        color: "nayuta",
        message: res.error,
        title: "ログアウトに失敗しました",
      })
    } else {
      window.location.replace("/")
    }
  })

  const handleClick = async () => {
    await runAction()
  }

  return (
    <Button autoContrast color="gray" loading={isPending} onClick={handleClick}>
      ログアウト
    </Button>
  )
}

export default SignOutButton
