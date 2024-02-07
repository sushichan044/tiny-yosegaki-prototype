import { projects, users } from "@/db/schema"
import { relations } from "drizzle-orm"
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const usersToJoinedProjects = pgTable(
  "users_to_joined_projects",
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

const usersToJoinedProjectsRelations = relations(
  usersToJoinedProjects,
  ({ one }) => ({
    project: one(projects, {
      fields: [usersToJoinedProjects.projectId],
      references: [projects.projectId],
    }),
    user: one(users, {
      fields: [usersToJoinedProjects.userId],
      references: [users.userId],
    }),
  }),
)

const UserToJoinedProjectInsertSchema = createInsertSchema(
  usersToJoinedProjects,
)
const UserToJoinedProjectSelectSchema = createSelectSchema(
  usersToJoinedProjects,
)

type UserToJoinedProjectInsert = typeof usersToJoinedProjects.$inferInsert
type UserToJoinedProjectSelect = typeof usersToJoinedProjects.$inferSelect

export {
  UserToJoinedProjectInsertSchema,
  UserToJoinedProjectSelectSchema,
  usersToJoinedProjects,
  usersToJoinedProjectsRelations,
}
export type { UserToJoinedProjectInsert, UserToJoinedProjectSelect }
