"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_schema_1 = require("./chat.schema");
const chat_controller_1 = require("./chat.controller");
const authRoutes = async (fastify) => {
    fastify.addHook("onRequest", fastify.authenticate);
    fastify.get("/conversations", { schema: chat_schema_1.getConversationsByUserIdReq }, chat_controller_1.getConversationsByUserId);
    fastify.get("/messages/:conversationId", { schema: chat_schema_1.getMessagesByConversationIdReq }, chat_controller_1.getMessagesByConversationId);
    fastify.post('/open-conversation', { schema: chat_schema_1.CreatePrivateConversationReq }, chat_controller_1.createPrivateConversation);
};
exports.default = authRoutes;
