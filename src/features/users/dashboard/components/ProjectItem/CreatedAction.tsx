import { getManagePageUrl, getPostPageUrl } from "@/features/projects/utils/url"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconSend, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  projectId: string
}

const CreatedAction: React.FC<Props> = ({ projectId }) => {
  return (
    <>
      <Tooltip label="企画を管理する" position="bottom" withArrow>
        <ActionIcon
          aria-label="企画を管理する"
          color="gray"
          component={Link}
          href={getManagePageUrl(projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconSettings stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="寄せ書きを投稿する" position="bottom" withArrow>
        <ActionIcon
          aria-label="寄せ書きを投稿する"
          color="gray"
          component={Link}
          href={getPostPageUrl(projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconSend stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default CreatedAction
