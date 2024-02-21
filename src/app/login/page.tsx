import type { Metadata } from "next"

import SignIn from "@/features/auth/components/SignIn"
import { getUserFromSession } from "@/features/users/db"
import { Center, Container, Stack, Title } from "@mantine/core"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "ログイン",
}

export default async function Page() {
  const { data } = await getUserFromSession()
  if (data) {
    redirect("/dashboard")
  }

  return (
    <main className="flex-1 bg-white">
      <Container className="my-6 md:my-12" maw={320} p={0}>
        <Stack className="mt-[10vh] md:mt-[20vh]" gap="xl">
          <Center>
            <Title order={1} size="h2">
              ログイン
            </Title>
          </Center>
          <SignIn />
        </Stack>
      </Container>
    </main>
  )
}
