import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import Redis from "ioredis";
import { config } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
    redisSub: Redis;
  }
}

const redisPlugin: FastifyPluginAsync = async (fastify) => {
  const redisOptions = {
    port: Number(config.REDIS_PORT) || 6379,
    host: config.REDIS_HOST || "localhost",
    password: config.REDIS_AUTH || undefined,
    ...(config.REDIS_TLS === "true" && { tls: {} }),
  };

  const redis = new Redis(redisOptions);
  const redisSub = new Redis(redisOptions);

  fastify.decorate("redis", redis);
  fastify.decorate("redisSub", redisSub);

  fastify.addHook("onClose", async () => {
    await redis.quit();
    await redisSub.quit();
  });
};

export default fp(redisPlugin);
