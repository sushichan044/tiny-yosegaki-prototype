import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const users = pgTable("users", {
  avatarUrl: text("avatar_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  id: uuid("id").defaultRandom().primaryKey(),
  twitterDisplayName: text("twitter_display_name").notNull(),
  twitterName: text("twitter_name").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const UserInsertSchema = createInsertSchema(users)
