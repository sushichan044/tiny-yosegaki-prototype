"use client"

import { signIn } from "@/features/supabase/action"
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
      justify="space-between"
      leftSection={<IconBrandTwitter />}
      loading={loading}
      onClick={handleClick}
      radius="md"
      rightSection={<span></span>}
      size="lg"
    >
      Twitterでログイン/登録
    </Button>
  )
}

export default SignInButton
