import { getMessagesForProject } from "@/features/messages/action"
import MessageCard from "@/features/messages/components/MessageCard"
import { SimpleGrid } from "@mantine/core"
import React from "react"

type Props = {
  projectId: string
}

const ManyMessages: React.FC<Props> = async ({ projectId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const messages = await getMessagesForProject(projectId)

  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
      }}
      spacing="md"
      verticalSpacing="md"
    >
      {messages.map((message) => (
        <MessageCard key={message.messageId} message={message} />
      ))}
    </SimpleGrid>
  )
}

export default ManyMessages
