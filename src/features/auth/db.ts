import { db } from "@/db"
import { UserInsertSchema, users } from "@/db/schema/users"

const upsertUser = async (user: typeof users.$inferInsert) => {
  const res = await UserInsertSchema.safeParseAsync(user)
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

const getUser = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.id, userId)
    },
  })
  return user
}

export { getUser, upsertUser }
