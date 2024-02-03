"use client"

import { signIn } from "@/features/auth/action"
import { Button } from "@mantine/core"
import { IconBrandTwitter } from "@tabler/icons-react"

type Props = {
  redirectTo?: string | undefined
}

const SignInButton: React.FC<Props> = ({ redirectTo }) => {
  const handleClick = async () => {
    await signIn(redirectTo)
  }

  return (
    <Button
      color="nakuru"
      leftSection={<IconBrandTwitter />}
      onClick={handleClick}
    >
      Twitterでログイン
    </Button>
  )
}

export default SignInButton
