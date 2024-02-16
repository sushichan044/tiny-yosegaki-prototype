import { getPostPageUrl } from "@/features/projects/utils/url"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconPencil } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  projectId: string
}

const JoinedAction: React.FC<Props> = ({ projectId }) => {
  return (
    <>
      <Tooltip label="寄せ書きを編集する" position="bottom" withArrow>
        <ActionIcon
          aria-label="寄せ書きを編集する"
          color="gray"
          component={Link}
          href={getPostPageUrl(projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconPencil stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default JoinedAction
