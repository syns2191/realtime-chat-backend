import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as Schema from "./schema";
import { config } from "../config";
const dbConfig = {
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD
}
const pool = new Pool(dbConfig);

console.log(dbConfig)

export const db = drizzle(pool, { schema: Schema });
export type DB = typeof db;
