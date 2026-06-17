import * as dotenv from "dotenv";

dotenv.config();
export const config = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL || "",
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_AUTH: process.env.REDIS_AUTH,
};
