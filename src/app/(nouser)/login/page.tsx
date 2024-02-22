import type { Metadata } from "next"

import LoginCheck from "@/app/(nouser)/login/LoginCheck"
import { Container, LoadingOverlay } from "@mantine/core"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "ログイン",
}

export default function Page() {
  return (
    <Container className="my-6 md:my-12 relative" maw={320} p={0}>
      <Suspense fallback={<LoadingOverlay />}>
        <LoginCheck />
      </Suspense>
    </Container>
  )
}
