import fp from "fastify-plugin";
import cors, { FastifyCorsOptions } from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://yourdomain.com",
        "http://localhost:8000"
      ];

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
