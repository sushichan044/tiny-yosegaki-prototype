import { getLatestUserFromSupabase } from "@/features/users/db"
import Setting from "@/features/users/setting/components/Setting"
import { Container } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  // do not use getUserFromSession because this is a critical page
  const { data } = await getLatestUserFromSupabase()
  if (!data) {
    redirect("/login")
  }

  return (
    <Container size="sm">
      <Setting user={data} />
    </Container>
  )
}
