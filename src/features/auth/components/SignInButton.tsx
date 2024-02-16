"use client"

import { signIn } from "@/features/supabase/action"
import { Button } from "@mantine/core"
import { IconBrandX } from "@tabler/icons-react"
import { useState } from "react"

type Props = {
  redirectTo?: string | undefined
}

const SignInButton: React.FC<Props> = ({ redirectTo }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await signIn(redirectTo)
  }

  return (
    <Button
      color="nakuru"
      leftSection={<IconBrandX />}
      loading={loading}
      onClick={handleClick}
    >
      X(旧Twitter)でログイン
    </Button>
  )
}

export default SignInButton
