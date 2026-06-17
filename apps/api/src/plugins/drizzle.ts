import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { db, DB } from "../db";

declare module "fastify" {
  interface FastifyInstance {
    db: DB;
  }
}

const drizzlePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", db);
};

export default fp(drizzlePlugin);
