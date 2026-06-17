import { FastifyPluginAsync } from "fastify";
import { getUserHandler, createUserHandler, getCurrentUserHandler } from "./user.controller";
import { createUserSchema, getUserSchema } from "./user.schema";

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', fastify.authenticate);
  fastify.get("/", { schema:  getUserSchema}, getUserHandler);
  fastify.post("/", { schema: createUserSchema }, createUserHandler);
  fastify.get("/me", {}, getCurrentUserHandler)
};

export default userRoutes;
