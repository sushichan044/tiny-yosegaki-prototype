import type { SelectColumnsConfig } from "@/db/types"

import { db } from "@/db"
import { messages, usersToJoinedProjects } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import "server-only"

type GetUserMessageOptions = {
  columns: SelectColumnsConfig<typeof messages>
}

const getUserMessage = async (
  {
    projectId,
    userId,
  }: {
    projectId: string
    userId: string
  },
  options: Partial<GetUserMessageOptions>,
) => {
  const message = await db.query.messages.findFirst({
    where: (message, { and, eq }) => {
      return and(eq(message.projectId, projectId), eq(message.authorId, userId))
    },
    ...(options.columns && { columns: options.columns }),
  })
  return { data: message ?? null }
}

export type DeleteMessageArg = {
  authorId: string
  messageId: string
  projectId: string
}

const __deleteMessage = async ({
  authorId,
  messageId,
  projectId,
}: DeleteMessageArg) => {
  await db.transaction(async (tx) => {
    await tx
      .delete(usersToJoinedProjects)
      .where(
        and(
          eq(usersToJoinedProjects.projectId, projectId),
          eq(usersToJoinedProjects.userId, authorId),
        ),
      )
    await tx
      .delete(messages)
      .where(
        and(
          eq(messages.messageId, messageId),
          eq(messages.projectId, projectId),
        ),
      )
  })
  return
}

export { __deleteMessage, getUserMessage }
