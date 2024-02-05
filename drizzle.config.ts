import type { Config } from "drizzle-kit"

import { env } from "@/env.mjs"

export default {
  breakpoints: true,
  dbCredentials: {
    connectionString: env.SUPABASE_CONNECTION_STRING,
  },
  driver: "pg",
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
} satisfies Config
