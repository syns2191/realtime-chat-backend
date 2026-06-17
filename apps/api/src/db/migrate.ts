import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

console.log({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 5432,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true
})

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 5432,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = drizzle(pool);

const main = async () => {
  console.log("🚀 Running migrations...");
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  console.log("✅ Done!");
  await pool.end();
  process.exit(0);
};

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
