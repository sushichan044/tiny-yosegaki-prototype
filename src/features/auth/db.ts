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
          twitterId: res.data.twitterId,
          updatedAt: new Date(),
          userName: res.data.userName,
        },
        target: users.userId,
      })
  } catch (err) {
    console.error("upsertUser", err)
  }
}

const getUser = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.userId, userId)
    },
  })
  return user
}

export { getUser, upsertUser }
