import { FastifyRequest, FastifyReply } from "fastify";
import { chatService } from "./chat.service";
import {
  TCreateConversationBody,
  TCreatePrivateConversationBody,
} from "./chat.schema";
export const getConversationsByUserId = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  console.log("req.user", req.user);
  const userId = req.user?.id;
  const conversations = await chatService.getConversationsByUserId(userId);
  return reply.code(200).send(conversations);
};

export const getMessagesByConversationId = async (
  req: FastifyRequest<{ Params: { conversationId: number } }>,
  reply: FastifyReply,
) => {
  const messages = await chatService.getMessagesByConversationId(
    req.params.conversationId,
  );
  console.log(messages);
  return reply.code(200).send(messages);
};

export const createPrivateConversation = async (
  req: FastifyRequest<{ Body: TCreatePrivateConversationBody }>,
  reply: FastifyReply,
) => {
  const result = await chatService.createPrivateConversation(req.user.id, {
    type: req.body.type,
    friendId: req.body.friendId,
  });
  return reply.code(201).send(result);
};
