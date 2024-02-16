"use client"

import { ICON_STROKE_WIDTH } from "@/components/layouts/Header/UserMenu"
import { signOutUser } from "@/features/users/action"
import { useServerAction } from "@/hooks/useServerAction"
import { LoadingOverlay, MenuItem } from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

const SignOutItem = () => {
  const pathName = usePathname()
  const router = useRouter()
  const [runAction, isPending] = useServerAction(signOutUser, () => {
    router.refresh()
    window.location.reload()
  })

  const handleClick = () => {
    runAction({ revalidatePath: pathName })
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
