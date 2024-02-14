import type { z } from "zod"

import { projects } from "@/db/schema"
import { messages } from "@/db/schema/messages"
import { usersToJoinedProjects } from "@/db/schema/usersJoinedProjects"
import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const users = pgTable(
  "users",
  {
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    showTwitterOnProfile: boolean("show_twitter_on_profile")
      .notNull()
      .default(true),
    twitterId: text("twitter_id").unique().notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }),
    // avatar url will got from userId
    userId: uuid("user_id").notNull().primaryKey(),
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
  hostedProjects: many(projects),
  joinedProjects: many(usersToJoinedProjects),
  messages: many(messages),
}))

const UserInsertSchema = createInsertSchema(users, {
  userName: (s) =>
    s.userName.min(1, "ユーザー名は1文字以上である必要があります。"),
})
const UserSelectSchema = createSelectSchema(users)

const UserUpdateSchema = UserInsertSchema.pick({
  showTwitterOnProfile: true,
  userId: true,
  userName: true,
})

type UserInsert = typeof users.$inferInsert
type UserSelect = typeof users.$inferSelect
type UserUpdate = z.infer<typeof UserUpdateSchema>

export {
  UserInsertSchema,
  UserSelectSchema,
  UserUpdateSchema,
  users,
  usersRelations,
}
export type { UserInsert, UserSelect, UserUpdate }
