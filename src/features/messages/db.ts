import { db } from "@/db"
import { messages } from "@/db/schema/messages"
import { eq, sql } from "drizzle-orm"

const getMessageByUserPrepared = db
  .select({
    attachmentFileName: messages.attachmentFileName,
    content: messages.content,
    id: messages.id,
    isAccepted: messages.isAccepted,
  })
  .from(messages)
  .where(eq(messages.userId, sql.placeholder("userId")))
  .prepare("get_message_by_user_prepared")

const getMessageByUser = async (userId: string) => {
  const res = await getMessageByUserPrepared.execute({ userId })
  return res.length > 0 ? res[0] : null
}

export { getMessageByUser }
