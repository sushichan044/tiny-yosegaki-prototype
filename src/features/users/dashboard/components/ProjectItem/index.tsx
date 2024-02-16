import type { ProjectSelectWithAuthorName } from "@/features/projects/db"

import { getPostPageUrl } from "@/features/projects/utils/url"
import Author from "@/features/users/dashboard/components/ProjectItem/Author"
import ItemBadge from "@/features/users/dashboard/components/ProjectItem/ItemBadge"
import { ActionIcon, Space, Text, Tooltip } from "@mantine/core"
import { IconPencil } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  project: ProjectSelectWithAuthorName
  variant: "created" | "joined"
}

const ProjectItem: React.FC<Props> = ({ project, variant }) => {
  const isJoinedVariant = variant === "joined"
  const postPageUrl = getPostPageUrl(project.projectId)

  return (
    <article>
      {isJoinedVariant && (
        <>
          <Author id={project.authorId} name={project.author.userName} />
          <Space h="xs" />
        </>
      )}
      <div className="flex flex-row flex-nowrap items-start gap-x-3 md:gap-x-6">
        <div className="flex-1">
          <Text component={Link} fw="bold" href={postPageUrl} lineClamp={2}>
            {project.projectName}
          </Text>
        </div>
        {isJoinedVariant ? (
          <Tooltip label="編集する" position="bottom" withArrow>
            <ActionIcon
              aria-label="編集する"
              color="gray"
              component={Link}
              href={postPageUrl}
              p={4}
              radius="50%"
              size="lg"
              variant="light"
            >
              <IconPencil stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="編集する" position="bottom" withArrow>
            <ActionIcon
              aria-label="編集する"
              color="gray"
              // component={Link}
              // href={getPostPageUrl(project.projectId)}
              p={4}
              radius="50%"
              size="lg"
              variant="light"
            >
              <IconPencil stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      <Space h="sm" />
      <div className="flex flex-row items-center">
        <ItemBadge status={project.status} />
      </div>
    </article>
  )
}

export default ProjectItem
