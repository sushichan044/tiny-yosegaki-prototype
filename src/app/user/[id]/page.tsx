import type { Metadata } from "next"

import { getUserForMetaData, getUserFromId } from "@/features/users/db"
import { Title } from "@mantine/core"
import { notFound } from "next/navigation"

type UserParams = { params: { id: string } }

// export async function generateStaticParams() {
//   const users = await db.query.users.findMany({
//     columns: {
//       userId: true,
//     },
//   })
//   return users.map((u) => ({ id: u.userId }))
// }

export const generateMetadata = async ({
  params: { id },
}: UserParams): Promise<Metadata> => {
  const { data } = await getUserForMetaData(id)

  return {
    description: `${data?.userName}さんのプロフィールです。`,
    title: `${data?.userName}さんのプロフィール`,
  }
}

export default async function Page({ params }: UserParams) {
  const { id } = params
  const { data } = await getUserFromId(id)
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
