import { db } from "@/db"

const getMessageByUser = async (userId: string) => {
  const message = await db.query.messages.findFirst({
    where: (messages, { eq }) => {
      return eq(messages.userId, userId)
    },
  })
  return message
}

export { getMessageByUser }
