import type { Metadata } from "next"

import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
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
    redirect("/project")
  }

  return (
    <>
      <Header showUserHeader={false} />
      <main className="flex-1 bg-white">
        <Container className="my-6 md:my-12" maw={320} p={0}>
          <Stack className="mt-[10vh] md:mt-[20vh]" gap="xl">
            <Center>
              <Title order={1} size="h2">
                ログイン
              </Title>
            </Center>
            <SignIn redirectTo="/project" />
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  )
}
