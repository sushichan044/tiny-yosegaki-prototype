import * as schema from "@/db/schema"
import { env } from "@/env.mjs"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const client = postgres(env.SUPABASE_CONNECTION_STRING)
const db = drizzle(client, {
  schema: schema,
})

export { db }
