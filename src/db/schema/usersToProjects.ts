import { projects, users } from "@/db/schema"
import { relations } from "drizzle-orm"
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const usersToProjects = pgTable(
  "users_to_projects",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.projectId),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.userId),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.userId] }),
  }),
)

const usersToProjectsRelations = relations(usersToProjects, ({ one }) => ({
  project: one(projects, {
    fields: [usersToProjects.projectId],
    references: [projects.projectId],
  }),
  user: one(users, {
    fields: [usersToProjects.userId],
    references: [users.userId],
  }),
}))

const UserToProjectInsertSchema = createInsertSchema(usersToProjects)
const UserToProjectSelectSchema = createSelectSchema(usersToProjects)

type UserToProjectInsert = typeof usersToProjects.$inferInsert
type UserToProjectSelect = typeof usersToProjects.$inferSelect

export {
  UserToProjectInsertSchema,
  UserToProjectSelectSchema,
  usersToProjects,
  usersToProjectsRelations,
}
export type { UserToProjectInsert, UserToProjectSelect }
