"use client"

import { signOut } from "@/features/supabase/action"
import { MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"

const SignOutItem = () => {
  return (
    <MenuItem
      aria-label="ログアウト"
      leftSection={<IconLogout stroke={1} />}
      onClick={() => signOut()}
      role="button"
    >
      <p>ログアウト</p>
    </MenuItem>
  )
}

export default SignOutItem
