import { messages } from "@/db/schema/messages"
import { users } from "@/db/schema/users"
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

const projects = pgTable(
  "projects",
  {
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.userId),
    createdAt: timestamp("created_at").defaultNow(),
    deadLineDate: timestamp("dead_line_date").notNull(),
    hasThumbnail: boolean("has_thumbnail").notNull().default(false),
    projectDescription: text("project_description").notNull(),
    projectId: uuid("project_id").defaultRandom().primaryKey(),
    projectName: text("project_name").notNull(),
    tags: text("tags").array().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      projectNameIdx: index("project_name_idx").on(table.projectName),
      tags: index("tags_idx").on(table.tags),
    }
  },
)

const projectsRelations = relations(projects, ({ many, one }) => ({
  author: one(users, {
    fields: [projects.authorId],
    references: [users.userId],
  }),
  messages: many(messages),
}))

const ProjectInsertSchema = createInsertSchema(projects)
const ProjectSelectSchema = createSelectSchema(projects)

type ProjectInsert = typeof projects.$inferInsert
type ProjectSelect = typeof projects.$inferSelect

export { ProjectInsertSchema, ProjectSelectSchema, projects, projectsRelations }
export type { ProjectInsert, ProjectSelect }
