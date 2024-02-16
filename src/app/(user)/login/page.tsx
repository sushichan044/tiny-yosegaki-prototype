import type { Metadata } from "next"

import SignIn from "@/features/auth/components/SignIn"
import { Space, VisuallyHidden } from "@mantine/core"

export const metadata: Metadata = {
  title: "ログイン",
}

export default function Page() {
  return (
    <div>
      <VisuallyHidden>
        <h1>ログイン</h1>
      </VisuallyHidden>
      <Space h="2.5rem" />
      <SignIn />
    </div>
  )
}
