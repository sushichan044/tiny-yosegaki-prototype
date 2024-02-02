"use client"

import { signIn } from "@/features/auth/action"
import { Button } from "@mantine/core"
import { usePathname } from "next/navigation"

const Login = () => {
  const pathName = usePathname()

  return (
    <Button color="nakuru" onClick={() => signIn(pathName)}>
      ログイン
    </Button>
  )
}

export default Login
