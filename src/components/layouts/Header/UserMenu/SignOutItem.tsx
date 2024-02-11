"use client"

import { ICON_STROKE_WIDTH } from "@/components/layouts/Header/UserMenu"
import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { LoadingOverlay, MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { redirect } from "next/navigation"

const SignOutItem = () => {
  const [runAction, isPending] = useServerAction(signOutUser)

  const handleClick = () => {
    // @ts-expect-error no arg is needed
    runAction()
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        redirect("/")
      })
  }

  return (
    <MenuItem
      aria-label="ログアウト"
      leftSection={<IconLogout stroke={ICON_STROKE_WIDTH} />}
      onClick={handleClick}
      role="button"
    >
      <LoadingOverlay visible={isPending} />
      <p>ログアウト</p>
    </MenuItem>
  )
}

export default SignOutItem
