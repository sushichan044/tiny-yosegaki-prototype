import { messages } from "@/db/schema/messages"
import { users } from "@/db/schema/users"
import { usersToJoinedProjects } from "@/db/schema/usersJoinedProjects"
import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const projects = pgTable(
  "projects",
  {
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.userId),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    deadLineDate: timestamp("dead_line_date", {
      withTimezone: true,
    }),
    hasThumbnail: boolean("has_thumbnail").notNull().default(false),
    projectDescription: text("project_description").notNull(),
    projectId: uuid("project_id").defaultRandom().primaryKey(),
    projectName: text("project_name").notNull(),
    status: varchar("status", {
      enum: ["prepare", "open", "closed"],
      length: 10,
    }).default("prepare"),
    tags: text("tags").array().notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => {
    return {
      authorIdIdx: index("author_id_idx").on(table.authorId),
      projectNameIdx: index("project_name_idx").on(table.projectName),
      tagsIdx: index("tags_idx").on(table.tags),
    }
  },
)

const projectsRelations = relations(projects, ({ many, one }) => ({
  author: one(users, {
    fields: [projects.authorId],
    references: [users.userId],
  }),
  joinedUsers: many(usersToJoinedProjects),
  messages: many(messages),
}))

const ProjectInsertSchema = createInsertSchema(projects, {
  deadLineDate: (s) =>
    s.deadLineDate.min(
      new Date(),
      "締め切り日は現在時刻より後である必要があります。",
    ),
  projectDescription: (s) =>
    s.projectDescription.min(1, "企画の説明は1文字以上である必要があります。"),
  projectName: (s) =>
    s.projectName.min(1, "企画名は1文字以上である必要があります。"),
})
const ProjectSelectSchema = createSelectSchema(projects)

type ProjectInsert = typeof projects.$inferInsert
type ProjectSelect = typeof projects.$inferSelect

export { ProjectInsertSchema, ProjectSelectSchema, projects, projectsRelations }
export type { ProjectInsert, ProjectSelect }
