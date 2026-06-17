import {
  CreatePrivateConversationReq,
  getConversationsByUserIdReq,
  getMessagesByConversationIdReq,
} from "./chat.schema";
import {
  getMessagesByConversationId,
  getConversationsByUserId,
  createPrivateConversation,
} from "./chat.controller";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.get(
    "/conversations",
    { schema: getConversationsByUserIdReq },
    getConversationsByUserId,
  );
  fastify.get(
    "/messages/:conversationId",
    { schema: getMessagesByConversationIdReq },
    getMessagesByConversationId,
  );
  fastify.post(
    '/open-conversation',
    {schema: CreatePrivateConversationReq},
    createPrivateConversation
  )
};

export default authRoutes;
