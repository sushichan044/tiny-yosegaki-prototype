import type { MessageSelect } from "@/db/schema/messages"

import { db } from "@/db"

const getMessageByUser = async (
  userId: string,
): Promise<{ data: MessageSelect | null }> => {
  const message = await db.query.messages.findFirst({
    where: (messages, { eq }) => {
      return eq(messages.userId, userId)
    },
  })
  return {
    data: message ?? null,
  }
}

const getAllMessages = async (): Promise<{ data: MessageSelect[] }> => {
  const messages = await db.query.messages.findMany({
    where(message, { eq }) {
      return eq(message.isAccepted, true)
    },
  })
  return {
    data: messages,
  }
}

export { getAllMessages, getMessageByUser }
