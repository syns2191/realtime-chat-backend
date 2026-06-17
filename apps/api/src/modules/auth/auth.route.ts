import { LoginReqSchema, RegisterReqSchema } from "./login.schema";
import { login, register } from "./auth.controller";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post("/login", { schema: LoginReqSchema }, login);
  fastify.post("/register", { schema: RegisterReqSchema }, register);
};

export default authRoutes;
