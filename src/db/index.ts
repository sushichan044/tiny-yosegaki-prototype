import * as messagesSchema from "@/db/schema/messages"
import * as usersSchema from "@/db/schema/users"
import { env } from "@/env.mjs"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const client = postgres(env.SUPABASE_CONNECTION_STRING)
const db = drizzle(client, {
  schema: { ...messagesSchema, ...usersSchema },
})

export { db }
