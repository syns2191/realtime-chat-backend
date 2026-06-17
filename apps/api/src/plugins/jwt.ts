import fp from "fastify-plugin";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import { config } from "../config";

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fjwt, {
    secret: config.JWT_SECRET || "secret",
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (error) {
        return reply.code(401).send({
          message: "Unauthorize",
        });
      }
    },
  );
};

export default fp(jwtPlugin);
