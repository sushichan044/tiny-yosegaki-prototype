import { getEditPageUrl } from "@/features/projects/utils/url"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconPencil } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  projectId: string
}

const CreatedAction: React.FC<Props> = ({ projectId }) => {
  return (
    <>
      <Tooltip label="編集する" position="bottom" withArrow>
        <ActionIcon
          aria-label="編集する"
          color="gray"
          component={Link}
          href={getEditPageUrl(projectId)}
          p={4}
          radius="50%"
          size="lg"
          variant="light"
        >
          <IconPencil stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export default CreatedAction
