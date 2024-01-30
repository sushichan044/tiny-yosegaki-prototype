import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  password: process.env["DATABASE_PASSWORD"],
  username: process.env["DATABASE_USERNAME"],
})

const db = drizzle(connection)

export { db as httpDB }
