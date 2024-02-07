"use client"

import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { LoadingOverlay, MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"

const SignOutItem = () => {
  const [runAction, isPending] = useServerAction(signOutUser)

  return (
    <MenuItem
      aria-label="ログアウト"
      leftSection={<IconLogout stroke={1} />}
      // @ts-expect-error no arg is needed
      onClick={() => runAction()}
      role="button"
    >
      <LoadingOverlay visible={isPending} />
      <p>ログアウト</p>
    </MenuItem>
  )
}

export default SignOutItem
