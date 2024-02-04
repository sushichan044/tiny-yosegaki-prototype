import { users } from "@/db/schema/users"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const messages = pgTable(
  "messages",
  {
    attachmentFileName: text("attachment_file_name"),
    authorAvatarUrl: text("author_avatar_url").notNull(),
    authorName: text("author_name").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    id: uuid("id").defaultRandom().primaryKey(),
    isAccepted: boolean("is_accepted").notNull().default(false),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      userIdx: index("user_id_idx").on(table.userId),
    }
  },
)

export type MessageInsert = typeof messages.$inferInsert
export type MessageSelect = typeof messages.$inferSelect

export const MessageInsertSchema = createInsertSchema(messages)
