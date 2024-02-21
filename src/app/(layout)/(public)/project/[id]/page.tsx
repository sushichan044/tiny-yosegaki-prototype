import type { Metadata } from "next"

import ManyMessages from "@/features/messages/components/ManyMessages"
import {
  getProjectAction,
  getProjectForMetadataAction,
} from "@/features/projects/action"
import { getUserAvatarUrl } from "@/features/users/avatar/url"
import UserTwitterLink from "@/features/users/dashboard/components/UserTwitterLink"
import {
  Avatar,
  Button,
  Card,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type ProjectParams = { params: { id: string } }

// export async function generateStaticParams() {
//   const projects = await db.query.projects.findMany({
//     columns: { projectId: true },
//   })
//   return projects.map((p) => ({ id: p.projectId }))
// }

export const generateMetadata = async ({
  params: { id },
}: ProjectParams): Promise<Metadata> => {
  const { data } = await getProjectForMetadataAction(id)

  return {
    description: data?.projectDescription,
    title: data?.projectName,
  }
}

const SpaceUnderTitle = () => <Space h="xl" />

export default async function Page({ params }: ProjectParams) {
  const { data } = await getProjectAction(params.id)
  if (!data) {
    notFound()
  }

  return (
    <Stack component="article">
      <div className="text-center">
        <Title order={1} size="h2" textWrap="balance">
          {data.projectName}
        </Title>
      </div>
      <Group
        align="flex-start"
        classNames={{ root: "relative" }}
        justify="space-between"
      >
        <div>
          <SpaceUnderTitle />
          <Suspense fallback={<Skeleton />}>
            <ManyMessages projectId={params.id} />
          </Suspense>
        </div>
        <aside className="sticky top-0 w-[240px]">
          <SpaceUnderTitle />
          <Card padding="md" radius="md" withBorder>
            <Stack>
              <div className="flex flex-row flex-nowrap items-center gap-x-2">
                <Avatar
                  alt="企画者のアバター"
                  size={36}
                  src={getUserAvatarUrl(data.authorId)}
                />
                <Text c="#2c2c2c" fw="bold" size="sm">
                  {data.author.userName}
                </Text>
                <UserTwitterLink
                  userId={data.authorId}
                  userName={data.author.userName}
                />
              </div>
              <Text c="gray" size="sm">
                {data.projectDescription}
              </Text>
              <Tooltip label="a">
                <Button
                  color="nakuru"
                  component={Link}
                  href={`/project/${data.projectId}/post`}
                >
                  企画に参加する
                </Button>
              </Tooltip>
            </Stack>
          </Card>
        </aside>
      </Group>
    </Stack>
  )
}
