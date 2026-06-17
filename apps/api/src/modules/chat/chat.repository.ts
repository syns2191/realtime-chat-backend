import {
  conversations,
  conversationsParticipants,
  chatMessages,
  chatStatus,
  users,
} from "../../db/schema";
import { eq, desc, InferSelectModel, max, sql, and } from "drizzle-orm";
import { db } from "../../db";
import { alias } from "drizzle-orm/pg-core";

type TCreateConversation = typeof conversations.$inferInsert;
export type TConversationRow = InferSelectModel<typeof conversations>;
export type TChatMessageRow = InferSelectModel<typeof chatMessages>;
type TCreateConversationParticipant =
  typeof conversationsParticipants.$inferInsert;
type TCreateMessage = typeof chatMessages.$inferInsert;
type TUpdateMessageStatus = typeof chatStatus.$inferInsert;

export const chatRepository = {
  getConversationsByUserId: async (userId: number) => {
    const participantsLateral = db
      .select({
        list: sql<
          { userid: number }[]
        >`array_agg(jsonb_build_object('id', ${users.id}, 'name', ${users.name}, 'email', ${users.email}))`.as(
          "list",
        ),
      })
      .from(conversationsParticipants)
      .leftJoin(users, eq(users.id, conversationsParticipants.userId))
      .where(eq(conversationsParticipants.conversationId, conversations.id))
      .as("participants");

    const lastMessageLateral = db
      .select({ message: chatMessages.message })
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversations.id))
      .orderBy(sql`${chatMessages.createdAt} DESC`)
      .limit(1)
      .as("last_msg");

    const unreadLateral = db
      .select({ cnt: sql<number>`count(*)`.as("cnt") })
      .from(chatMessages)
      .innerJoin(
        chatStatus,
        and(
          eq(chatStatus.messageId, chatMessages.id),
          eq(chatStatus.messageStatus, "pending"),
        ),
      )
      .where(eq(chatMessages.conversationId, conversations.id))
      .as("unread");

    const result = await db
      .select({
        id: conversations.id,
        type: conversations.type,
        lastMessageAt: conversations.lastMessageAt,
        lastMessage: lastMessageLateral.message,
        participants: participantsLateral.list,
        unread: unreadLateral.cnt,
      })
      .from(conversations)
      .innerJoin(
        conversationsParticipants,
        and(
          eq(conversationsParticipants.conversationId, conversations.id),
          eq(conversationsParticipants.userId, userId),
        ),
      )
      .leftJoinLateral(participantsLateral, sql`true`)
      .leftJoinLateral(lastMessageLateral, sql`true`)
      .leftJoinLateral(unreadLateral, sql`true`)
      .where(
        and(
          eq(conversationsParticipants.userId, userId),
          eq(conversationsParticipants.isActive, true),
        ),
      )
      .orderBy(desc(conversations.lastMessageAt));
    return result;
  },
  getMessagesByConversationId: async (conversationId: number) => {
    const result = await db
      .select({
        id: chatMessages.id,
        message: chatMessages.message,
        conversationId: chatMessages.conversationId,
        createdAt: chatMessages.createdAt,
        from: chatMessages.from,
        status: chatStatus,
      })
      .from(chatMessages)
      .leftJoin(chatStatus, eq(chatStatus.messageId, chatMessages.id))
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(desc(chatMessages.createdAt));
    return result;
  },
  createConversation: async (
    conversation: TCreateConversation,
  ): Promise<TConversationRow | undefined> => {
    const result = await db
      .insert(conversations)
      .values(conversation)
      .returning();
    return result[0];
  },
  updateLastMessageAt: async (conversationId: number) => {
    const result = await db
      .update(conversations)
      .set({
        lastMessageAt: new Date(),
      })
      .where(eq(conversations.id, conversationId))
      .returning({
        id: conversations.id,
        lastMessageAt: conversations.lastMessageAt,
      });
    return result;
  },
  activateParticipants: async (conversationId: number) => {
    await db
      .update(conversationsParticipants)
      .set({
        isActive: true,
      })
      .where(eq(conversationsParticipants.conversationId, conversationId));
  },
  addParticipants: async (participants: TCreateConversationParticipant[]) => {
    const result = await db
      .insert(conversationsParticipants)
      .values(participants)
      .onConflictDoUpdate({
        target: [
          conversationsParticipants.conversationId,
          conversationsParticipants.userId,
        ],
        set: {
          isActive: sql`excluded.is_active`,
        },
      })
      .returning();
    return result;
  },
  addMessage: async (
    message: TCreateMessage,
  ): Promise<TChatMessageRow | undefined> => {
    const result = await db.insert(chatMessages).values(message).returning();
    return result[0];
  },
  setStatusMessage: async (status: TUpdateMessageStatus) => {
    const result = await db
      .insert(chatStatus)
      .values(status)
      .onConflictDoUpdate({
        target: [chatStatus.messageId, chatStatus.userId],
        set: {
          messageStatus: status.messageStatus,
        },
      })
      .returning();
    return result[0];
  },
  getExistingConversation: async (userId: number, friendId: number) => {
    const userParticipants = alias(
      conversationsParticipants,
      "user_participants",
    );
    const friendParticipants = alias(
      conversationsParticipants,
      "friend_participants",
    );
    const result = await db
      .select({
        id: conversations.id,
        name: conversations.name,
        type: conversations.type,
        participant: {
          id: friendParticipants.userId,
        },
      })
      .from(conversations)
      .leftJoin(
        userParticipants,
        and(
          eq(userParticipants.userId, userId),
          eq(userParticipants.conversationId, conversations.id),
        ),
      )
      .leftJoin(
        friendParticipants,
        and(
          eq(friendParticipants.conversationId, conversations.id),
          eq(friendParticipants.userId, friendId),
        ),
      )
      .where(
        and(
          eq(conversations.type, "private"),
          eq(
            userParticipants.conversationId,
            friendParticipants.conversationId,
          ),
        ),
      );
    return result;
  },
};
