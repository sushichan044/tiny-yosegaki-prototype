"use client"

import { signIn } from "@/features/auth/action"
import { Button } from "@mantine/core"
import { IconBrandTwitter } from "@tabler/icons-react"
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
      leftSection={<IconBrandTwitter />}
      loading={loading}
      onClick={handleClick}
    >
      Twitterでログイン
    </Button>
  )
}

export default SignInButton
