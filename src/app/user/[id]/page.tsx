import { db } from "@/db"
import { getCachedUserFromId } from "@/features/users/next"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type UserParams = { params: { id: string } }

export async function generateStaticParams() {
  const users = await db.query.users.findMany({
    columns: {
      userId: true,
    },
  })
  return users.map((u) => ({ id: u.userId }))
}

export default async function Page({ params }: UserParams) {
  const { id } = params
  const { data } = await getCachedUserFromId(id)
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
