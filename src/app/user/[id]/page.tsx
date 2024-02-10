import { getUserFromId } from "@/features/users/db"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type UserParams = { params: { id: string } }

export default async function Page({ params }: UserParams) {
  const { data } = await getUserFromId(params.id)
  if (!data) {
    notFound()
  }

  return (
    <>
      <div>
        <Title order={1}>{data.userName}</Title>
      </div>
    </>
  )
}
