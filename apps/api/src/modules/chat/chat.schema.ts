import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";

export const ConversationSchema = Type.Object({
  id: Type.Number(),
  type: Type.Union([Type.Literal("private"), Type.Literal("group")]),
  name: Type.Optional(Type.String()),
  img: Type.Optional(Type.String()),
  lastMessageAt: Type.Optional(Type.String({ format: "date-time" })),
  participants: Type.Optional(Type.Array({})),
  lastMessage: Type.Optional(Type.String()),
  unread: Type.Optional(Type.Number())
});

export const ConversationParticipantSchema = Type.Object({
  id: Type.Number(),
  conversationId: Type.Number(),
  isActive: Type.Optional(Type.Boolean()),
  userId: Type.Number(),
});

export const ChatStatusSchema = Type.Object({
  id: Type.Number(),
  messageId: Type.Number(),
  userId: Type.Number(),
  messageStatus: Type.Union([
    Type.Literal("pending"),
    Type.Literal("sent"),
    Type.Literal("read"),
  ]),
  readAt: Type.Optional(Type.String({ format: "date-time" })),
});

export const ChatMessageSchema = Type.Object({
  id: Type.Number(),
  message: Type.String(),
  conversationId: Type.Number(),
  createdAt: Type.Optional(Type.String({format: 'date-time'})),
  from: Type.Number(),
  status: Type.Optional(ChatStatusSchema)
});

const CreateConversationBody = Type.Omit(ConversationSchema, ["id", "lastMessageAt"]);

export const CreateConversationReq: FastifySchema = {
  body: CreateConversationBody,
  response: {
    201: ConversationSchema,
  },
};

const CreatePrivateConversationType = Type.Object({
  type: Type.Union([Type.Literal("private"), Type.Literal("group")]),
  friendId: Type.Number()
});

export const CreatePrivateConversationReq: FastifySchema = {
  body: CreatePrivateConversationType,
  response: {
    201: ConversationSchema
  }
}


const AddParticipantsBody = Type.Omit(ConversationParticipantSchema, ["id"]);
export const AddParticipantsReq: FastifySchema = {
  body: AddParticipantsBody,
  response: {
    201: ConversationParticipantSchema,
  },
};

export const getConversationsByUserIdReq: FastifySchema = {
  querystring: Type.Object({
    name: Type.Optional(Type.String()),
  }),
  response: {
    200: Type.Array(ConversationSchema),
  },
};

export const getMessagesByConversationIdReq: FastifySchema = {
  params: Type.Object({
    conversationId: Type.Number(),
  }),
  response: {
    200: Type.Array(ChatMessageSchema),
  },
};


const chatMessageBody = Type.Omit(ChatMessageSchema, ["id", "createdAt"]);
const chatStatusBody = Type.Omit(ChatStatusSchema, ["id"]);

export type TConversation = Static<typeof ConversationSchema>;
export type TCreateConversationBody = Static<typeof CreateConversationBody>;
export type TAddParticipantsBody = Static<typeof AddParticipantsBody>;
export type TConversationParticipant = Static<
  typeof ConversationParticipantSchema
>;
export type TChatMessage = Static<typeof ChatMessageSchema>;
export type TChatStatus = Static<typeof ChatStatusSchema>;
export type TCreateChatMessageBody = Static<typeof chatMessageBody>;
export type TUpdateChatMessageStatusBody = Static<typeof chatStatusBody>;
export type TCreatePrivateConversationBody = Static<typeof CreatePrivateConversationType>;
