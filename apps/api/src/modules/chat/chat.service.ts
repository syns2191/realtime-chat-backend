import { chatRepository, TConversationRow } from "./chat.repository";
import {
  TCreateConversationBody,
  TAddParticipantsBody,
  TCreateChatMessageBody,
  TUpdateChatMessageStatusBody,
  TCreatePrivateConversationBody,
} from "./chat.schema";

export const chatService = {
  getConversationsByUserId: async (userId: number) => {
    return chatRepository.getConversationsByUserId(userId);
  },
  getMessagesByConversationId: async (conversationId: number) => {
    return chatRepository.getMessagesByConversationId(conversationId);
  },
  createConversation: async (
    conversation: TCreateConversationBody,
  ): Promise<TConversationRow | undefined> => {
    return chatRepository.createConversation(conversation);
  },
  addParticipants: async (participant: TAddParticipantsBody[]) => {
    return chatRepository.addParticipants(participant);
  },
  activateParticipants: async (conversationId: number) => {
    return chatRepository.activateParticipants(conversationId);
  },
  newMessage: async (message: TCreateChatMessageBody) => {
    return chatRepository.addMessage(message);
  },
  updateMessageStatus: async (
    updateMessageStatus: TUpdateChatMessageStatusBody,
  ) => {
    return chatRepository.setStatusMessage({
      messageId: updateMessageStatus.messageId,
      userId: updateMessageStatus.userId,
      messageStatus: updateMessageStatus.messageStatus,
      readAt: updateMessageStatus.readAt
        ? new Date(updateMessageStatus.readAt)
        : undefined,
    });
  },
  createPrivateConversation: async (
    userId: number,
    data: TCreatePrivateConversationBody,
  ) => {
    const existingConversation = await chatRepository.getExistingConversation(
      userId,
      data.friendId,
    );
    if (existingConversation.length) {
      return existingConversation[0];
    }
    const newConversation = await chatRepository.createConversation({
      type: data.type,
    });
    if (!newConversation) {
      throw Error("Failed start conversation");
    }
    await chatRepository.addParticipants([
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
