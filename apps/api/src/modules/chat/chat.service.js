"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const chat_repository_1 = require("./chat.repository");
exports.chatService = {
    getConversationsByUserId: async (userId) => {
        return chat_repository_1.chatRepository.getConversationsByUserId(userId);
    },
    getMessagesByConversationId: async (conversationId) => {
        return chat_repository_1.chatRepository.getMessagesByConversationId(conversationId);
    },
    createConversation: async (conversation) => {
        return chat_repository_1.chatRepository.createConversation(conversation);
    },
    addParticipants: async (participant) => {
        return chat_repository_1.chatRepository.addParticipants(participant);
    },
    activateParticipants: async (conversationId) => {
        return chat_repository_1.chatRepository.activateParticipants(conversationId);
    },
    newMessage: async (message) => {
        return chat_repository_1.chatRepository.addMessage(message);
    },
    updateMessageStatus: async (updateMessageStatus) => {
        return chat_repository_1.chatRepository.setStatusMessage({
            messageId: updateMessageStatus.messageId,
            userId: updateMessageStatus.userId,
            messageStatus: updateMessageStatus.messageStatus,
            readAt: updateMessageStatus.readAt
                ? new Date(updateMessageStatus.readAt)
                : undefined,
        });
    },
    createPrivateConversation: async (userId, data) => {
        const existingConversation = await chat_repository_1.chatRepository.getExistingConversation(userId, data.friendId);
        if (existingConversation.length) {
            return existingConversation[0];
        }
        const newConversation = await chat_repository_1.chatRepository.createConversation({
            type: data.type,
        });
        if (!newConversation) {
            throw Error("Failed start conversation");
        }
        await chat_repository_1.chatRepository.addParticipants([
            {
                userId,
                isActive: true,
                conversationId: newConversation.id,
            },
            {
                userId: data.friendId,
                conversationId: newConversation.id,
            },
        ]);
        return {
            id: newConversation.id,
            type: data.type,
            name: newConversation.name,
        };
    },
};
