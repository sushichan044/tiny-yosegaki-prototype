"use client"

import LoginPresenter from "@/app/(nouser)/login/Presenter"
import { useSearchParams } from "next/navigation"

const LoginWrapper = () => {
  const param = useSearchParams()
  const next = param.get("next") ?? undefined

  return <LoginPresenter next={next} />
}

export default LoginWrapper
