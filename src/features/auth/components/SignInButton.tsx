"use client"

import { signIn } from "@/features/auth/action"
import { Button } from "@mantine/core"

type Props = {
  redirectTo?: string | undefined
}

const SignInButton: React.FC<Props> = ({ redirectTo }) => {
  const handleClick = async () => {
    await signIn(redirectTo)
  }

  return (
    <Button onClick={handleClick}>
      <span>Twitterでログイン</span>
    </Button>
  )
}

export default SignInButton
