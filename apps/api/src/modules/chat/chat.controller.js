"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrivateConversation = exports.getMessagesByConversationId = exports.getConversationsByUserId = void 0;
const chat_service_1 = require("./chat.service");
const getConversationsByUserId = async (req, reply) => {
    console.log("req.user", req.user);
    const userId = req.user?.id;
    const conversations = await chat_service_1.chatService.getConversationsByUserId(userId);
    return reply.code(200).send(conversations);
};
exports.getConversationsByUserId = getConversationsByUserId;
const getMessagesByConversationId = async (req, reply) => {
    const messages = await chat_service_1.chatService.getMessagesByConversationId(req.params.conversationId);
    console.log(messages);
    return reply.code(200).send(messages);
};
exports.getMessagesByConversationId = getMessagesByConversationId;
const createPrivateConversation = async (req, reply) => {
    const result = await chat_service_1.chatService.createPrivateConversation(req.user.id, {
        type: req.body.type,
        friendId: req.body.friendId,
    });
    return reply.code(201).send(result);
};
exports.createPrivateConversation = createPrivateConversation;
