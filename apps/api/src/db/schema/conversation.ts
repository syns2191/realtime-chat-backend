import { pgTable, integer, text, pgEnum, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./user";
import { dateFields } from "./common";
import { boolean } from "drizzle-orm/pg-core";

export const conversationsEnum = pgEnum("conversations_type", [
  "private",
  "group",
]);
export const messageStatusEnum = pgEnum("message_status_enum", [
  "pending",
  "sent",
  "read",
]);

export const conversations = pgTable("conversations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: conversationsEnum().notNull().default("private"),
  name: text(),
  img: text(),
  lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
  ...dateFields,
});

export const conversationsParticipants = pgTable("conversations_participants", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull(),
  isActive: boolean("is_active").default(false),
  ...dateFields,
}, (table) => [
    uniqueIndex("conversation_user_unique").on(table.conversationId, table.userId)
  ]);

export const chatMessages = pgTable("chat_messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: text().notNull().default("empty message"),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  from: integer()
    .notNull()
    .references(() => users.id),
  ...dateFields,
});

export const chatStatus = pgTable("chat_status", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  messageId: integer("message_id")
    .notNull()
    .references(() => chatMessages.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  messageStatus: messageStatusEnum('message_status').default("pending"),
  ...dateFields,
  readAt: timestamp("read_at"),
}, (table) => [
    uniqueIndex("message_user_unique").on(table.messageId, table.userId)
  ]);
