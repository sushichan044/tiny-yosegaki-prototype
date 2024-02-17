import type { JoinedProjectSelect } from "@/features/projects/db"

import MessageDeleteItem from "@/features/messages/components/MessageDelete/Item"
import { ActionIcon, Menu, MenuDropdown, MenuTarget } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"

type Props = {
  project: JoinedProjectSelect
}

const JoinedMenu: React.FC<Props> = ({ project: { messages, projectId } }) => {
  const userMessage = messages[0]

  return (
    <Menu keepMounted position="bottom-end" shadow="md">
      <MenuTarget>
        <ActionIcon
          aria-label="詳細メニューを開く"
          color="gray"
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconChevronDown stroke={1.5} />
        </ActionIcon>
      </MenuTarget>
      <MenuDropdown>
        <MessageDeleteItem
          messageAuthorId={userMessage.authorId}
          messageId={userMessage.messageId}
          projectId={projectId}
        >
          投稿を削除する
        </MessageDeleteItem>
      </MenuDropdown>
    </Menu>
  )
}

export default JoinedMenu
