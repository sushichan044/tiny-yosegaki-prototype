import { db } from "@/db"
import { UserInsertSchema, users } from "@/db/schema/users"
import { eq, sql } from "drizzle-orm"

const upsertUser = async (user: typeof users.$inferInsert) => {
  const res = UserInsertSchema.safeParse(user)
  if (!res.success) {
    throw new Error("Invalid user")
  }

  try {
    await db
      .insert(users)
      .values(res.data)
      .onConflictDoUpdate({
        set: {
          avatarUrl: res.data.avatarUrl,
          twitterDisplayName: res.data.twitterDisplayName,
          twitterName: res.data.twitterName,
          updatedAt: res.data.updatedAt,
        },
        target: users.id,
      })
  } catch (err) {
    console.error(err)
  }
}

const getUserPrepared = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder("id")))
  .prepare("get_user_prepared")

export { getUserPrepared, upsertUser }
