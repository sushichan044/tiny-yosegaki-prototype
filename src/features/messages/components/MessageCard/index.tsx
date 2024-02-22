import type { getMessagesForProject } from "@/features/messages/action"

import UserAvatar from "@/features/users/dashboard/components/UserAvatar"
import { Group, Paper, Space, Text } from "@mantine/core"
import Link from "next/link"

type Props = {
  message: Awaited<ReturnType<typeof getMessagesForProject>>[number]
}

const MessageCard: React.FC<Props> = ({ message }) => {
  return (
    <Paper mih="200px" p="lg" shadow="xs">
      <Group align="center" gap="xs">
        <UserAvatar
          alt={`${message.displayName}さんのアバター`}
          size={36}
          userId={message.authorId}
        />
        <Text
          component={Link}
          fw="bold"
          href={`/user/${message.authorId}`}
          size="sm"
        >
          {message.displayName}
        </Text>
      </Group>
      <Space h="lg" />
      {message.content}
    </Paper>
  )
}

export default MessageCard
