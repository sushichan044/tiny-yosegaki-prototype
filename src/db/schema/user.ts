import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  createdAt: timestamp("created_at").defaultNow(),
  id: uuid("id").defaultRandom().primaryKey(),
  twitterAvatarUrl: text("twitter_avatar_url").notNull(),
  twitterDisplayName: text("twitter_display_name").notNull(),
  twitterName: text("twitter_name").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: uuid("user_id").unique().notNull(),
  userName: text("user_name").notNull(),
})
