"use server"

import { USER_JOINED_PROJECTS_CACHE_TAG } from "@/cache"
import { db } from "@/db"
import { usersToJoinedProjects } from "@/db/schema"
import {
  type MessageInsert,
  MessageInsertSchema,
  messages,
} from "@/db/schema/messages"
import { revalidateTag } from "next/cache"

const getUserMessageForPostForm = async ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const res = await db.query.messages.findFirst({
    columns: {
      content: true,
      displayName: true,
      hasAttachment: true,
    },
    where: (message, { and, eq }) => {
      return and(eq(message.projectId, projectId), eq(message.authorId, userId))
    },
  })
  return res
}

type InsertMessageFunction = (
  project: MessageInsert,
  {
    isNew,
  }: {
    isNew: boolean
  },
) => Promise<
  | {
      error: null
      success: true
    }
  | {
      error: string
      success: false
    }
>
const upsertMessage: InsertMessageFunction = async (
  data: MessageInsert,
  { isNew },
) => {
  const res = await MessageInsertSchema.safeParseAsync(data)
  if (!res.success) {
    return {
      error: "入力内容に誤りがあります。",
      success: false,
    }
  }

  if (!isNew) {
    try {
      await db.update(messages).set(res.data)
    } catch (err) {
      console.error("upsertMessage", err)
      return {
        error: "投稿の編集に失敗しました。",
        success: false,
      }
    }
    return { error: null, success: true }
  }

  const dbRes = await db.transaction(async (tx) => {
    try {
      await tx.insert(messages).values(res.data).onConflictDoNothing({
        target: messages.messageId,
      })
    } catch (err) {
      console.error("upsertMessage", err)
      tx.rollback()
      return {
        error: "投稿に失敗しました。",
        success: false as const,
      }
    }
    try {
      await tx
        .insert(usersToJoinedProjects)
        .values({
          projectId: res.data.projectId,
          userId: res.data.authorId,
        })
        .onConflictDoNothing({
          target: [
            usersToJoinedProjects.projectId,
            usersToJoinedProjects.userId,
          ],
        })
    } catch (err) {
      console.error("upsertMessage", err)
      tx.rollback()
      return {
        error: "投稿に失敗しました。",
        success: false as const,
      }
    }
    return { error: null, success: true as const }
  })
  revalidateTag(USER_JOINED_PROJECTS_CACHE_TAG)
  return dbRes
}

export { getUserMessageForPostForm, upsertMessage }
