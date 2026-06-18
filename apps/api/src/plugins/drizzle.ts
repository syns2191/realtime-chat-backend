import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { db, pool, DB } from "../db";

declare module "fastify" {
  interface FastifyInstance {
    db: DB;
  }
}

const drizzlePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", db);

  fastify.addHook("onClose", async () => {
    await pool.end();
  });
};

export default fp(drizzlePlugin);
