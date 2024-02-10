import NewProjectForm from "@/features/projects/components/NewProjectForm"
import { getUserFromSession } from "@/features/users/db"
import { Container, Title } from "@mantine/core"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await getUserFromSession()
  if (!data) {
    redirect("/login")
  }

  return (
    <Container size="sm">
      <div>
        <Title order={1}>新しい寄せ書き企画を立てる</Title>
        <NewProjectForm user={data} />
      </div>
    </Container>
  )
}
