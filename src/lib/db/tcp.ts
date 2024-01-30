import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  database: "database",
  host: "host",
  user: "user",
})

const poolConnection = mysql.createPool({
  database: "database",
  host: "host",
  user: "user",
})

const db = drizzle(connection)

const poolDB = drizzle(poolConnection)

export { db as tcpDB, poolDB as tcpPoolDB }
