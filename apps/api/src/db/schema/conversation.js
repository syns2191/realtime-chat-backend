"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatStatus = exports.chatMessages = exports.conversationsParticipants = exports.conversations = exports.messageStatusEnum = exports.conversationsEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const common_1 = require("./common");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.conversationsEnum = (0, pg_core_1.pgEnum)("conversations_type", [
    "private",
    "group",
]);
exports.messageStatusEnum = (0, pg_core_1.pgEnum)("message_status_enum", [
    "pending",
    "sent",
    "read",
]);
exports.conversations = (0, pg_core_1.pgTable)("conversations", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    type: (0, exports.conversationsEnum)().notNull().default("private"),
    name: (0, pg_core_1.text)(),
    img: (0, pg_core_1.text)(),
    lastMessageAt: (0, pg_core_1.timestamp)("last_message_at").notNull().defaultNow(),
    ...common_1.dateFields,
});
exports.conversationsParticipants = (0, pg_core_1.pgTable)("conversations_participants", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    conversationId: (0, pg_core_1.integer)("conversation_id")
        .notNull()
        .references(() => exports.conversations.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    isActive: (0, pg_core_2.boolean)("is_active").default(false),
    ...common_1.dateFields,
}, (table) => [
    (0, pg_core_1.uniqueIndex)("conversation_user_unique").on(table.conversationId, table.userId)
]);
exports.chatMessages = (0, pg_core_1.pgTable)("chat_messages", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    message: (0, pg_core_1.text)().notNull().default("empty message"),
    conversationId: (0, pg_core_1.integer)("conversation_id")
        .notNull()
        .references(() => exports.conversations.id, { onDelete: "cascade" }),
    from: (0, pg_core_1.integer)()
        .notNull()
        .references(() => user_1.users.id),
    ...common_1.dateFields,
});
exports.chatStatus = (0, pg_core_1.pgTable)("chat_status", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    messageId: (0, pg_core_1.integer)("message_id")
        .notNull()
        .references(() => exports.chatMessages.id, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => user_1.users.id),
    messageStatus: (0, exports.messageStatusEnum)('message_status').default("pending"),
    ...common_1.dateFields,
    readAt: (0, pg_core_1.timestamp)("read_at"),
}, (table) => [
    (0, pg_core_1.uniqueIndex)("message_user_unique").on(table.messageId, table.userId)
]);
