import { conversations, conversationsParticipants, chatMessages, chatStatus } from "../../db/schema";
import { InferSelectModel } from "drizzle-orm";
type TCreateConversation = typeof conversations.$inferInsert;
export type TConversationRow = InferSelectModel<typeof conversations>;
export type TChatMessageRow = InferSelectModel<typeof chatMessages>;
type TCreateConversationParticipant = typeof conversationsParticipants.$inferInsert;
type TCreateMessage = typeof chatMessages.$inferInsert;
type TUpdateMessageStatus = typeof chatStatus.$inferInsert;
export declare const chatRepository: {
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
    createConversation: (conversation: TCreateConversation) => Promise<TConversationRow | undefined>;
    updateLastMessageAt: (conversationId: number) => Promise<{
        id: number;
        lastMessageAt: Date;
    }[]>;
    activateParticipants: (conversationId: number) => Promise<void>;
    addParticipants: (participants: TCreateConversationParticipant[]) => Promise<{
        id: number;
        isActive: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        conversationId: number;
    }[]>;
    addMessage: (message: TCreateMessage) => Promise<TChatMessageRow | undefined>;
    setStatusMessage: (status: TUpdateMessageStatus) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        messageId: number;
        messageStatus: "pending" | "sent" | "read" | null;
        readAt: Date | null;
    } | undefined>;
    getExistingConversation: (userId: number, friendId: number) => Promise<{
        id: number;
        name: string | null;
        type: "private" | "group";
        participant: {
            id: number;
        } | null;
    }[]>;
};
export {};
//# sourceMappingURL=chat.repository.d.ts.map