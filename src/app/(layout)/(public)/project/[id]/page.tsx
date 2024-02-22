import type { CardProps } from "@mantine/core"
import type { Metadata } from "next"

import ManyMessages from "@/features/messages/components/ManyMessages"
import {
  getProjectAction,
  getProjectForMetadataAction,
} from "@/features/projects/action"
import { getUserAvatarUrl } from "@/features/users/avatar/url"
import UserTwitterLink from "@/features/users/dashboard/components/UserTwitterLink"
import { getUserFromSession } from "@/features/users/db"
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  CardSection,
  Container,
  Divider,
  Group,
  Skeleton,
  Space,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { IconPencil } from "@tabler/icons-react"
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

const ManageIcon = async ({
  authorId,
  projectId,
}: {
  authorId: string
  projectId: string
}) => {
  const { data } = await getUserFromSession()
  if (!data || data.userId !== authorId) {
    return null
  }
  return (
    <Tooltip label="企画を編集する" withArrow>
      <ActionIcon
        color="gray"
        component={Link}
        href={`/project/${projectId}/manage`}
        size={20}
        variant="subtle"
      >
        <IconPencil stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}

const AboutProject = ({
  data,
  isMobile,
}: {
  data: {
    author: {
      showTwitterOnProfile: boolean
      userName: string
    }
    authorId: string
    createdAt: Date | null
    deadLineDate: Date | null
    hasThumbnail: boolean
    projectDescription: string
    projectId: string
    projectName: string
    status: "closed" | "open" | "prepare" | null
    tags: string[]
    updatedAt: Date | null
  }
  isMobile: boolean
}) => {
  const cardProps = {
    className: isMobile ? "md:hidden" : "max-md:hidden",
    pb: "md",
    pt: "sm",
    px: "md",
    radius: isMobile ? undefined : "md",
    withBorder: !isMobile,
  } as const satisfies CardProps

  return (
    <Card {...cardProps}>
      <div className="flex items-center flex-row flex-nowrap justify-between">
        <Title c="#2e2e2e" fw="bold" order={2} size="1rem">
          企画について
        </Title>
        <ManageIcon authorId={data.authorId} projectId={data.projectId} />
      </div>
      <CardSection>
        <Divider my="sm" />
      </CardSection>
      {/* <Space h="lg" /> */}
      <div className="flex flex-row flex-nowrap items-center gap-x-2">
        {/* <Link href={`/user/${data.authorId}`}> */}
        <Avatar
          alt="企画者のアバター"
          size={36}
          src={getUserAvatarUrl(data.authorId)}
        />
        {/* </Link> */}
        {/* <Link href={`/user/${data.authorId}`}> */}
        <Text c="#2c2c2c" fw="bold" size="sm">
          {data.author.userName}
        </Text>
        {/* </Link> */}
        <UserTwitterLink
          userId={data.authorId}
          userName={data.author.userName}
        />
      </div>
      <Space h="xs" />
      <Text c="gray" className="whitespace-pre-wrap" size="sm">
        {data.projectDescription}
      </Text>
      <Space h="lg" />
      <Button
        color="nakuru"
        component={Link}
        fullWidth
        href={`/project/${data.projectId}/post`}
      >
        寄せ書きに参加する
      </Button>
    </Card>
  )
}

export default async function Page({ params }: ProjectParams) {
  const { data } = await getProjectAction(params.id)
  if (!data) {
    notFound()
  }

  return (
    <>
      <article className="my-6 md:my-12">
        <Container component="section" size="md">
          <Title className="text-center" order={1} size="h2">
            {data.projectName}
          </Title>
        </Container>
        <SpaceUnderTitle />
        <Container className="md:hidden" component="section" p={0} size="lg">
          <AboutProject data={data} isMobile />
        </Container>
        <Container size="lg">
          <Group
            align="flex-start"
            classNames={{ root: "relative" }}
            justify="space-between"
            // wrap="nowrap"
          >
            <section className="flex-1">
              <SpaceUnderTitle />
              <Title order={2} size="md">
                投稿されたメッセージ
              </Title>
              <Space h="xs" />
              <Suspense fallback={<Skeleton />}>
                <ManyMessages projectId={params.id} />
              </Suspense>
            </section>
            <aside className="max-md:hidden sticky shrink-0 top-0 w-[240px]">
              {/* <Space h="1.625rem" /> */}
              <SpaceUnderTitle />
              <AboutProject data={data} isMobile={false} />
            </aside>
          </Group>
        </Container>
      </article>
    </>
  )
}
