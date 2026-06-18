import { TConversationRow } from "./chat.repository";
import { TCreateConversationBody, TAddParticipantsBody, TCreateChatMessageBody, TUpdateChatMessageStatusBody, TCreatePrivateConversationBody } from "./chat.schema";
export declare const chatService: {
    getConversationsByUserId: (userId: number) => Promise<{
        id: number;
        type: "private" | "group";
        lastMessageAt: Date;
        lastMessage: string | null;
        participants: {
            userid: number;
        }[];
        unread: number;
    }[]>;
    getMessagesByConversationId: (conversationId: number) => Promise<{
        id: number;
        message: string;
        conversationId: number;
        createdAt: Date;
        from: number;
        status: {
            readAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            messageId: number;
            userId: number;
            messageStatus: "pending" | "sent" | "read" | null;
        } | null;
    }[]>;
    createConversation: (conversation: TCreateConversationBody) => Promise<TConversationRow | undefined>;
    addParticipants: (participant: TAddParticipantsBody[]) => Promise<{
        id: number;
        isActive: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        conversationId: number;
    }[]>;
    activateParticipants: (conversationId: number) => Promise<void>;
    newMessage: (message: TCreateChatMessageBody) => Promise<{
        from: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        conversationId: number;
        message: string;
    } | undefined>;
    updateMessageStatus: (updateMessageStatus: TUpdateChatMessageStatusBody) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        messageId: number;
        messageStatus: "pending" | "sent" | "read" | null;
        readAt: Date | null;
    } | undefined>;
    createPrivateConversation: (userId: number, data: TCreatePrivateConversationBody) => Promise<{
        id: number;
        name: string | null;
        type: "private" | "group";
        participant: {
            id: number;
        } | null;
    } | {
        id: number;
        type: "private" | "group";
        name: string | null;
    } | undefined>;
};
//# sourceMappingURL=chat.service.d.ts.map