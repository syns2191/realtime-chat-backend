import fp from "fastify-plugin";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { config } from "../config";

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = config.CORS_ORIGINS;

      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
});
