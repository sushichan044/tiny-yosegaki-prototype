import SignIn from "@/features/auth/components/SignIn"
import { getLatestUserFromSupabase } from "@/features/users/db"
import { Center, Stack, Title } from "@mantine/core"
import { redirect } from "next/navigation"

type Props = {
  next?: string | undefined
}

const LoginCheck = async ({ next }: Props) => {
  const redirectTo = next ?? "/project"

  const { data } = await getLatestUserFromSupabase({ client: "component" })
  if (data) {
    redirect(redirectTo)
  }

  return (
    <Stack className="mt-[10vh] md:mt-[20vh]" gap="xl">
      <Center>
        <Title order={1} size="h2">
          ログイン
        </Title>
      </Center>
      <SignIn redirectTo={redirectTo} />
    </Stack>
  )
}

export default LoginCheck
