"use client"

import { ICON_STROKE_WIDTH } from "@/components/layouts/Header/UserMenu"
import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { LoadingOverlay, MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"

const SignOutItem = () => {
  const [runAction, isPending] = useServerAction(signOutUser, () => {
    window.location.replace("/")
  })

  const handleClick = async () => {
    await runAction()
  }

  return (
    <MenuItem
      aria-label="ログアウト"
      color="red"
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
