import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "./user.service";
import { TUserQuery, TCreateUser } from "./user.schema";

export const getUserHandler = async (
  req: FastifyRequest<{ Querystring: TUserQuery }>,
  reply: FastifyReply,
) => {
  const users = await userService.getUsers(req.query);
  return reply.send(users);
};

export const createUserHandler = async (
  req: FastifyRequest<{ Body: TCreateUser }>,
  reply: FastifyReply,
) => {
  const user = await userService.create(req.body);
  return reply.code(201).send(user);
};

export const getCurrentUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const currentUserId = req.user.id;
  const user = await userService.getUserById(currentUserId);
  return reply.code(200).send(user);
}
