import LoginCheck from "@/app/(nouser)/login/LoginCheck"
import { Container, LoadingOverlay } from "@mantine/core"
import { Suspense } from "react"

type Props = {
  next?: string | undefined
}

export default async function LoginPresenter({ next }: Props) {
  return (
    <>
      <Container className="my-6 md:my-12 relative" maw={320} p={0}>
        <Suspense fallback={<LoadingOverlay />}>
          <LoginCheck next={next} />
        </Suspense>
      </Container>
    </>
  )
}
