import { messages } from "@/db/schema/messages"
import { projects } from "@/db/schema/projects"
import { relations } from "drizzle-orm"
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const users = pgTable(
  "users",
  {
    createdAt: timestamp("created_at").defaultNow(),
    twitterId: text("twitter_id").unique(),
    updatedAt: timestamp("updated_at").defaultNow(),
    // avatar url will got from userId
    userId: uuid("user_id").defaultRandom().primaryKey(),
    userName: text("user_name").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.userName),
      twitterIdIdx: index("twitter_id_idx").on(table.twitterId),
    }
  },
)

const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  projects: many(projects),
}))

const UserInsertSchema = createInsertSchema(users)
const UserSelectSchema = createSelectSchema(users)

type UserInsert = typeof users.$inferInsert
type UserSelect = typeof users.$inferSelect

export { UserInsertSchema, UserSelectSchema, users, usersRelations }
export type { UserInsert, UserSelect }
