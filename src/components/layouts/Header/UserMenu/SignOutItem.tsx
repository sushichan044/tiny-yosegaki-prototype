"use client"

import { signOutUser } from "@/features/users/action"
import { MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"

const SignOutItem = () => {
  return (
    <MenuItem
      aria-label="ログアウト"
      leftSection={<IconLogout stroke={1} />}
      onClick={() => signOutUser()}
      role="button"
    >
      <p>ログアウト</p>
    </MenuItem>
  )
}

export default SignOutItem
