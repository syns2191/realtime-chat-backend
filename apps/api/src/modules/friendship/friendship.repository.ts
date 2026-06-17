import { users, friendship, friendList } from "../../db/schema";
import { and, eq, or } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "../../db";

type TCreateFriendshipInput = typeof friendship.$inferInsert;

export const friendshipRepository = {
  findAndFilter: async (id: number) => {
    const requesterUser = alias(users, "requester_user");
    const addresserUser = alias(users, "addresser_user");
    const result = await db
      .select({
        id: friendship.id,
        status: friendship.status,
        requester: {
          id: requesterUser.id,
          name: requesterUser.name,
          email: requesterUser.email,
        },
        addresser: {
          id: addresserUser.id,
          name: addresserUser.name,
          email: addresserUser.email,
        },
      })
      .from(friendship)
      .leftJoin(requesterUser, eq(requesterUser.id, friendship.requester))
      .leftJoin(addresserUser, eq(addresserUser.id, friendship.addresser))
      .where(
        and(
          eq(friendship.status, "pending"),
          or(eq(friendship.requester, id), eq(friendship.addresser, id)),
        ),
      );
    return result;
  },
  getFriend: async (
    requester: number,
    addresser: number,
  ): Promise<{ id: number }[]> => {
    const existFriend = await db
      .select({ id: friendship.id })
      .from(friendship)
      .where(
        and(
          eq(friendship.addresser, addresser),
          eq(friendship.requester, requester),
        ),
      );
    return existFriend;
  },
  getFriendByEmail: async (email: string, userId: number) => {
    const requesterFriend = alias(friendship, "requester_friendship");
    const addresserFriend = alias(friendship, "addresser_friendship");
    return db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        friend: friendList,
        requester: requesterFriend,
        addresser: addresserFriend,
      })
      .from(users)
      .leftJoin(requesterFriend, and(eq(requesterFriend.requester, users.id), eq(requesterFriend.addresser, userId)))
      .leftJoin(addresserFriend, and(eq(addresserFriend.addresser, users.id), eq(addresserFriend.requester, userId)))
      .leftJoin(
        friendList,
        and(eq(friendList.friendId, users.id), eq(friendList.userId, userId)),
      )
      .where(eq(users.email, email));
  },
  createFriendship: async (data: TCreateFriendshipInput) => {
    const friend = await db
      .insert(friendship)
      .values(data)
      .onConflictDoNothing({
        target: [friendship.requester, friendship.addresser],
      })
      .returning();
    if (friend.length) {
      return friend[0];
    }
    throw Error("Failed invited friend");
  },
  update: async (
    id: number,
    data: Partial<TCreateFriendshipInput>,
  ): Promise<(typeof friendship.$inferSelect)[]> => {
    return db
      .update(friendship)
      .set({
        status: data.status,
      })
      .where(eq(friendship.id, id))
      .returning();
  },
};
