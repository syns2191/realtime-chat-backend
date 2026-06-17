import { FastifyReply, FastifyRequest } from "fastify";
import { TRegister, TLogin } from "./login.schema";
import { authService } from "./auth.service";

export const login = async (
  req: FastifyRequest<{ Body: TLogin }>,
  reply: FastifyReply,
) => {
  const loginResult = await authService.login(req.body, req.server.jwt.sign);
  return reply.code(201).send(loginResult);
};

export const register = async (
  req: FastifyRequest<{ Body: TRegister }>,
  reply: FastifyReply,
) => {
  const result = await authService.register(req.body);
  return reply.code(201).send(result);
};
