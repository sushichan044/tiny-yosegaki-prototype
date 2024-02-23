"use server"

import type { DeleteMessageArg } from "@/features/messages/db"

import { USER_JOINED_PROJECTS_CACHE_TAG } from "@/cache"
import { db } from "@/db"
import { usersToJoinedProjects } from "@/db/schema"
import {
  type MessageInsert,
  MessageInsertSchema,
  messages,
} from "@/db/schema/messages"
import { __deleteMessage } from "@/features/messages/db"
import { isValidUUID } from "@/utils/uuid"
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
      messageId: true,
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
      result: {
        insertedId: string
      }[]
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
      const result = await db
        .update(messages)
        .set(res.data)
        .returning({ insertedId: messages.messageId })
      return { error: null, result: result, success: true }
    } catch (err) {
      console.error("upsertMessage", err)
      return {
        error: "投稿の編集に失敗しました。",
        success: false,
      }
    }
  }

  const dbRes = await db.transaction(async (tx) => {
    let insRes
    try {
      insRes = await tx
        .insert(messages)
        .values(res.data)
        .onConflictDoNothing({
          target: messages.messageId,
        })
        .returning({ insertedId: messages.messageId })
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
    return { error: null, result: insRes, success: true as const }
  })
  revalidateTag(USER_JOINED_PROJECTS_CACHE_TAG)
  return dbRes
}

const deleteMessage = async ({
  authorId,
  messageId,
  projectId,
}: DeleteMessageArg) => {
  try {
    await __deleteMessage({ authorId, messageId, projectId })
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}

const getMessagesForProject = async (projectId: string) => {
  const validation = isValidUUID(projectId)
  if (!validation.success) {
    return []
  }
  const res = await db.query.messages.findMany({
    orderBy(fields, { desc }) {
      return desc(fields.createdAt)
    },
    where(fields, { eq }) {
      return eq(fields.projectId, validation.data)
    },
  })
  return res
}

export {
  deleteMessage,
  getMessagesForProject,
  getUserMessageForPostForm,
  upsertMessage,
}
