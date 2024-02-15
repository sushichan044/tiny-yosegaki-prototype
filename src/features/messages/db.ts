import type { messages } from "@/db/schema"
import type { SelectColumnsConfig } from "@/db/types"

import { db } from "@/db"
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

export { getUserMessage }
