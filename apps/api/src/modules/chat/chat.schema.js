"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByConversationIdReq = exports.getConversationsByUserIdReq = exports.AddParticipantsReq = exports.CreatePrivateConversationReq = exports.CreateConversationReq = exports.ChatMessageSchema = exports.ChatStatusSchema = exports.ConversationParticipantSchema = exports.ConversationSchema = void 0;
const typebox_1 = require("typebox");
exports.ConversationSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    type: typebox_1.Type.Union([typebox_1.Type.Literal("private"), typebox_1.Type.Literal("group")]),
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    img: typebox_1.Type.Optional(typebox_1.Type.String()),
    lastMessageAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date-time" })),
    participants: typebox_1.Type.Optional(typebox_1.Type.Array({})),
    lastMessage: typebox_1.Type.Optional(typebox_1.Type.String()),
    unread: typebox_1.Type.Optional(typebox_1.Type.Number())
});
exports.ConversationParticipantSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    conversationId: typebox_1.Type.Number(),
    isActive: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    userId: typebox_1.Type.Number(),
});
exports.ChatStatusSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    messageId: typebox_1.Type.Number(),
    userId: typebox_1.Type.Number(),
    messageStatus: typebox_1.Type.Union([
        typebox_1.Type.Literal("pending"),
        typebox_1.Type.Literal("sent"),
        typebox_1.Type.Literal("read"),
    ]),
    readAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date-time" })),
});
exports.ChatMessageSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    message: typebox_1.Type.String(),
    conversationId: typebox_1.Type.Number(),
    createdAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: 'date-time' })),
    from: typebox_1.Type.Number(),
    status: typebox_1.Type.Optional(exports.ChatStatusSchema)
});
const CreateConversationBody = typebox_1.Type.Omit(exports.ConversationSchema, ["id", "lastMessageAt"]);
exports.CreateConversationReq = {
    body: CreateConversationBody,
    response: {
        201: exports.ConversationSchema,
    },
};
const CreatePrivateConversationType = typebox_1.Type.Object({
    type: typebox_1.Type.Union([typebox_1.Type.Literal("private"), typebox_1.Type.Literal("group")]),
    friendId: typebox_1.Type.Number()
});
exports.CreatePrivateConversationReq = {
    body: CreatePrivateConversationType,
    response: {
        201: exports.ConversationSchema
    }
};
const AddParticipantsBody = typebox_1.Type.Omit(exports.ConversationParticipantSchema, ["id"]);
exports.AddParticipantsReq = {
    body: AddParticipantsBody,
    response: {
        201: exports.ConversationParticipantSchema,
    },
};
exports.getConversationsByUserIdReq = {
    querystring: typebox_1.Type.Object({
        name: typebox_1.Type.Optional(typebox_1.Type.String()),
    }),
    response: {
        200: typebox_1.Type.Array(exports.ConversationSchema),
    },
};
exports.getMessagesByConversationIdReq = {
    params: typebox_1.Type.Object({
        conversationId: typebox_1.Type.Number(),
    }),
    response: {
        200: typebox_1.Type.Array(exports.ChatMessageSchema),
    },
};
const chatMessageBody = typebox_1.Type.Omit(exports.ChatMessageSchema, ["id", "createdAt"]);
const chatStatusBody = typebox_1.Type.Omit(exports.ChatStatusSchema, ["id"]);
