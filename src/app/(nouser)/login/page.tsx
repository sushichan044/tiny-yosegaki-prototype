import type { Metadata } from "next"

import LoginWrapper from "@/app/(nouser)/login/Wrapper"

export const metadata: Metadata = {
  title: "ログイン",
}

export default function Page() {
  return <LoginWrapper />
}
