import { projects } from "@/db/schema/projects"
import { users } from "@/db/schema/users"
import { relations } from "drizzle-orm"
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const messages = pgTable("messages", {
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.userId),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  displayName: text("display_name").notNull(),
  hasAttachment: boolean("has_attachment").notNull().default(false),
  messageId: uuid("message_id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.projectId),
  shouldDisplay: boolean("should_display").notNull().default(true),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
})

const messagesRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.authorId],
    references: [users.userId],
  }),
  project: one(projects, {
    fields: [messages.projectId],
    references: [projects.projectId],
  }),
}))

const MessageInsertSchema = createInsertSchema(messages)
const MessageSelectSchema = createSelectSchema(messages)

type MessageInsert = typeof messages.$inferInsert
type MessageSelect = typeof messages.$inferSelect

export { MessageInsertSchema, MessageSelectSchema, messages, messagesRelations }
export type { MessageInsert, MessageSelect }
