"use client"

import { signIn } from "@/features/supabase/action"
import { useServerAction } from "@/hooks/useServerAction"
import { Button } from "@mantine/core"
import { IconBrandX } from "@tabler/icons-react"

type Props = {
  redirectTo?: string | undefined
}

const SignInButton: React.FC<Props> = ({ redirectTo }) => {
  const [runAction, isPending] = useServerAction(signIn)

  const handleClick = async () => {
    await runAction(redirectTo)
  }

  return (
    <Button
      color="black"
      justify="space-between"
      leftSection={<IconBrandX />}
      loading={isPending}
      onClick={handleClick}
      radius="md"
      rightSection={<span></span>}
      size="lg"
    >
      X(旧Twitter)でログイン
    </Button>
  )
}

export default SignInButton
