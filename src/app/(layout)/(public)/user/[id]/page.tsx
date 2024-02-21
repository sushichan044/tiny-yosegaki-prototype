import type { Metadata } from "next"

import UserAvatar from "@/features/users/dashboard/components/UserAvatar"
import UserTwitterLink from "@/features/users/dashboard/components/UserTwitterLink"
import {
  getUserForMetaData,
  getUserWithoutTwitterId,
} from "@/features/users/db"
import { Center, Stack, Title } from "@mantine/core"
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
  const { data } = await getUserWithoutTwitterId(id)
  if (!data) {
    notFound()
  }

  return (
    <Stack gap="lg">
      <Center>
        <Stack align="center" gap="xs">
          <UserAvatar size="lg" userId={id} userName={data.userName} />
          <Title order={1} size="h2">
            {data.userName}
          </Title>
          <UserTwitterLink userId={id} userName={data.userName} />
        </Stack>
      </Center>
    </Stack>
  )
}
