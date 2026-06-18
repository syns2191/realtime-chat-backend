"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepository = void 0;
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.chatRepository = {
    getConversationsByUserId: async (userId) => {
        const participantsLateral = db_1.db
            .select({
            list: (0, drizzle_orm_1.sql) `array_agg(jsonb_build_object('id', ${schema_1.users.id}, 'name', ${schema_1.users.name}, 'email', ${schema_1.users.email}))`.as("list"),
        })
            .from(schema_1.conversationsParticipants)
            .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.users.id, schema_1.conversationsParticipants.userId))
            .where((0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.conversationId, schema_1.conversations.id))
            .as("participants");
        const lastMessageLateral = db_1.db
            .select({ message: schema_1.chatMessages.message })
            .from(schema_1.chatMessages)
            .where((0, drizzle_orm_1.eq)(schema_1.chatMessages.conversationId, schema_1.conversations.id))
            .orderBy((0, drizzle_orm_1.sql) `${schema_1.chatMessages.createdAt} DESC`)
            .limit(1)
            .as("last_msg");
        const unreadLateral = db_1.db
            .select({ cnt: (0, drizzle_orm_1.sql) `count(*)`.as("cnt") })
            .from(schema_1.chatMessages)
            .innerJoin(schema_1.chatStatus, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.chatStatus.messageId, schema_1.chatMessages.id), (0, drizzle_orm_1.eq)(schema_1.chatStatus.messageStatus, "pending")))
            .where((0, drizzle_orm_1.eq)(schema_1.chatMessages.conversationId, schema_1.conversations.id))
            .as("unread");
        const result = await db_1.db
            .select({
            id: schema_1.conversations.id,
            type: schema_1.conversations.type,
            lastMessageAt: schema_1.conversations.lastMessageAt,
            lastMessage: lastMessageLateral.message,
            participants: participantsLateral.list,
            unread: unreadLateral.cnt,
        })
            .from(schema_1.conversations)
            .innerJoin(schema_1.conversationsParticipants, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.conversationId, schema_1.conversations.id), (0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.userId, userId)))
            .leftJoinLateral(participantsLateral, (0, drizzle_orm_1.sql) `true`)
            .leftJoinLateral(lastMessageLateral, (0, drizzle_orm_1.sql) `true`)
            .leftJoinLateral(unreadLateral, (0, drizzle_orm_1.sql) `true`)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.userId, userId), (0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.isActive, true)))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.conversations.lastMessageAt));
        return result;
    },
    getMessagesByConversationId: async (conversationId) => {
        const result = await db_1.db
            .select({
            id: schema_1.chatMessages.id,
            message: schema_1.chatMessages.message,
            conversationId: schema_1.chatMessages.conversationId,
            createdAt: schema_1.chatMessages.createdAt,
            from: schema_1.chatMessages.from,
            status: schema_1.chatStatus,
        })
            .from(schema_1.chatMessages)
            .leftJoin(schema_1.chatStatus, (0, drizzle_orm_1.eq)(schema_1.chatStatus.messageId, schema_1.chatMessages.id))
            .where((0, drizzle_orm_1.eq)(schema_1.chatMessages.conversationId, conversationId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.chatMessages.createdAt));
        return result;
    },
    createConversation: async (conversation) => {
        const result = await db_1.db
            .insert(schema_1.conversations)
            .values(conversation)
            .returning();
        return result[0];
    },
    updateLastMessageAt: async (conversationId) => {
        const result = await db_1.db
            .update(schema_1.conversations)
            .set({
            lastMessageAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.conversations.id, conversationId))
            .returning({
            id: schema_1.conversations.id,
            lastMessageAt: schema_1.conversations.lastMessageAt,
        });
        return result;
    },
    activateParticipants: async (conversationId) => {
        await db_1.db
            .update(schema_1.conversationsParticipants)
            .set({
            isActive: true,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.conversationsParticipants.conversationId, conversationId));
    },
    addParticipants: async (participants) => {
        const result = await db_1.db
            .insert(schema_1.conversationsParticipants)
            .values(participants)
            .onConflictDoUpdate({
            target: [
                schema_1.conversationsParticipants.conversationId,
                schema_1.conversationsParticipants.userId,
            ],
            set: {
                isActive: (0, drizzle_orm_1.sql) `excluded.is_active`,
            },
        })
            .returning();
        return result;
    },
    addMessage: async (message) => {
        const result = await db_1.db.insert(schema_1.chatMessages).values(message).returning();
        return result[0];
    },
    setStatusMessage: async (status) => {
        const result = await db_1.db
            .insert(schema_1.chatStatus)
            .values(status)
            .onConflictDoUpdate({
            target: [schema_1.chatStatus.messageId, schema_1.chatStatus.userId],
            set: {
                messageStatus: status.messageStatus,
            },
        })
            .returning();
        return result[0];
    },
    getExistingConversation: async (userId, friendId) => {
        const userParticipants = (0, pg_core_1.alias)(schema_1.conversationsParticipants, "user_participants");
        const friendParticipants = (0, pg_core_1.alias)(schema_1.conversationsParticipants, "friend_participants");
        const result = await db_1.db
            .select({
            id: schema_1.conversations.id,
            name: schema_1.conversations.name,
            type: schema_1.conversations.type,
            participant: {
                id: friendParticipants.userId,
            },
        })
            .from(schema_1.conversations)
            .leftJoin(userParticipants, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(userParticipants.userId, userId), (0, drizzle_orm_1.eq)(userParticipants.conversationId, schema_1.conversations.id)))
            .leftJoin(friendParticipants, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(friendParticipants.conversationId, schema_1.conversations.id), (0, drizzle_orm_1.eq)(friendParticipants.userId, friendId)))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.conversations.type, "private"), (0, drizzle_orm_1.eq)(userParticipants.conversationId, friendParticipants.conversationId)));
        return result;
    },
};
