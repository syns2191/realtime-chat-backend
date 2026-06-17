import { FastifyRequest, FastifyReply } from "fastify";
import { friendshipService } from "./friendship.service";
import { TCreateFriendship } from "./friendship.schema";

export const inviteFriendHandler = async (
  req: FastifyRequest<{ Body: TCreateFriendship }>,
  reply: FastifyReply,
) => {
  const friendship = await friendshipService.inviteFriend({
    requester: req.user.id,
    addresser: req.body.addresser,
    status: "pending",
  });
  return reply.code(201).send(friendship);
};

export const acceptedRequestHandler = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  await friendshipService.acceptedRequest(req.params.id);
  return reply.code(200).send({ message: "Friend request accepted" });
};

export const rejectRequestHandler = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  const friendship = await friendshipService.rejectRequest(req.params.id);
  return reply.code(200).send(friendship);
};

export const unfriendHandler = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  await friendshipService.unfriend(req.params.id);
  return reply.code(200).send({ message: "Unfriended successfully" });
};

export const getMyFriendHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const friends = await friendshipService.getMyFriend(req.user.id);
  return reply.code(200).send(friends);
};

export const getInvitingFriendHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const invitations = await friendshipService.getInvitingFriend(req.user.id);
  return reply.code(200).send(invitations);
};

export const getFriendByEmail = async (
  req: FastifyRequest<{ Querystring: { email: string } }>,
  reply: FastifyReply,
) => {
  const friend = await friendshipService.getFriendByEmail(req.query.email, req.user.id);
  return reply.code(200).send(friend);
};
