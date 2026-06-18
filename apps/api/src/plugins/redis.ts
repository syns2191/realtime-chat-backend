import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import Redis from "ioredis";
import { config } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
  }
}

const redisPlugin: FastifyPluginAsync = async (fastify) => {
  const redis = new Redis({
    port: Number(config.REDIS_PORT) || 6379,
    host: config.REDIS_HOST || "localhost",
    password: config.REDIS_AUTH || undefined,
    ...(config.REDIS_TLS === "true" && { tls: {} }),
  });

  fastify.decorate("redis", redis);

  fastify.addHook("onClose", async () => {
    await redis.quit();
  });
};

export default fp(redisPlugin);
