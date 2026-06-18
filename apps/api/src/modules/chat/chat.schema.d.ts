import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";
export declare const ConversationSchema: Type.TObject<{
    id: Type.TNumber;
    type: Type.TUnion<[Type.TLiteral<"private">, Type.TLiteral<"group">]>;
    name: Type.TOptional<Type.TString>;
    img: Type.TOptional<Type.TString>;
    lastMessageAt: Type.TOptional<Type.TString>;
    participants: Type.TOptional<Type.TArray<{}>>;
    lastMessage: Type.TOptional<Type.TString>;
    unread: Type.TOptional<Type.TNumber>;
}>;
export declare const ConversationParticipantSchema: Type.TObject<{
    id: Type.TNumber;
    conversationId: Type.TNumber;
    isActive: Type.TOptional<Type.TBoolean>;
    userId: Type.TNumber;
}>;
export declare const ChatStatusSchema: Type.TObject<{
    id: Type.TNumber;
    messageId: Type.TNumber;
    userId: Type.TNumber;
    messageStatus: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"sent">, Type.TLiteral<"read">]>;
    readAt: Type.TOptional<Type.TString>;
}>;
export declare const ChatMessageSchema: Type.TObject<{
    id: Type.TNumber;
    message: Type.TString;
    conversationId: Type.TNumber;
    createdAt: Type.TOptional<Type.TString>;
    from: Type.TNumber;
    status: Type.TOptional<Type.TObject<{
        id: Type.TNumber;
        messageId: Type.TNumber;
        userId: Type.TNumber;
        messageStatus: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"sent">, Type.TLiteral<"read">]>;
        readAt: Type.TOptional<Type.TString>;
    }>>;
}>;
declare const CreateConversationBody: Type.TObject<{
    name: Type.TOptional<Type.TString>;
    type: Type.TUnion<[Type.TLiteral<"private">, Type.TLiteral<"group">]>;
    img: Type.TOptional<Type.TString>;
    participants: Type.TOptional<Type.TArray<{}>>;
    lastMessage: Type.TOptional<Type.TString>;
    unread: Type.TOptional<Type.TNumber>;
}>;
export declare const CreateConversationReq: FastifySchema;
declare const CreatePrivateConversationType: Type.TObject<{
    type: Type.TUnion<[Type.TLiteral<"private">, Type.TLiteral<"group">]>;
    friendId: Type.TNumber;
}>;
export declare const CreatePrivateConversationReq: FastifySchema;
declare const AddParticipantsBody: Type.TObject<{
    isActive: Type.TOptional<Type.TBoolean>;
    userId: Type.TNumber;
    conversationId: Type.TNumber;
}>;
export declare const AddParticipantsReq: FastifySchema;
export declare const getConversationsByUserIdReq: FastifySchema;
export declare const getMessagesByConversationIdReq: FastifySchema;
declare const chatMessageBody: Type.TObject<{
    from: Type.TNumber;
    status: Type.TOptional<Type.TObject<{
        id: Type.TNumber;
        messageId: Type.TNumber;
        userId: Type.TNumber;
        messageStatus: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"sent">, Type.TLiteral<"read">]>;
        readAt: Type.TOptional<Type.TString>;
    }>>;
    conversationId: Type.TNumber;
    message: Type.TString;
}>;
declare const chatStatusBody: Type.TObject<{
    userId: Type.TNumber;
    messageId: Type.TNumber;
    messageStatus: Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"sent">, Type.TLiteral<"read">]>;
    readAt: Type.TOptional<Type.TString>;
}>;
export type TConversation = Static<typeof ConversationSchema>;
export type TCreateConversationBody = Static<typeof CreateConversationBody>;
export type TAddParticipantsBody = Static<typeof AddParticipantsBody>;
export type TConversationParticipant = Static<typeof ConversationParticipantSchema>;
export type TChatMessage = Static<typeof ChatMessageSchema>;
export type TChatStatus = Static<typeof ChatStatusSchema>;
export type TCreateChatMessageBody = Static<typeof chatMessageBody>;
export type TUpdateChatMessageStatusBody = Static<typeof chatStatusBody>;
export type TCreatePrivateConversationBody = Static<typeof CreatePrivateConversationType>;
export {};
//# sourceMappingURL=chat.schema.d.ts.map