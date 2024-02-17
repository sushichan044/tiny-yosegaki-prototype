import type { JoinedProjectSelect } from "@/features/projects/db"

import {
  getPostPageUrl,
  getProjectPageUrl,
} from "@/features/projects/utils/url"
import JoinedMenu from "@/features/users/dashboard/components/ProjectItem/JoinedMenu"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconExternalLink, IconPencil } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  project: JoinedProjectSelect
}

const JoinedAction: React.FC<Props> = ({ project }) => {
  return (
    <>
      <Tooltip label="寄せ書きを編集する" position="bottom" withArrow>
        <ActionIcon
          aria-label="寄せ書きを編集する"
          color="gray"
          component={Link}
          href={getPostPageUrl(project.projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconPencil stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="企画ページを見る" position="bottom" withArrow>
        <ActionIcon
          aria-label="寄せ書きを投稿する"
          color="gray"
          component={Link}
          href={getProjectPageUrl(project.projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconExternalLink stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <JoinedMenu project={project} />
    </>
  )
}

export default JoinedAction
