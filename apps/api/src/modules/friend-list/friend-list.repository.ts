import { eq } from "drizzle-orm";
import { db } from "../../db";
import { friendList, users } from "../../db/schema";

type TCreateFriendInput = typeof friendList.$inferInsert;

export const friendListRepository = {
  createFriend: async (data: TCreateFriendInput[]) => {
    return db
      .insert(friendList)
      .values(data)
      .onConflictDoNothing({ target: [friendList.userId, friendList.friendId] })
      .returning();
  },
  getAndFilter: async (userId: number) => {
    const friends = await db
      .select({
        id: friendList.id,
        userId: friendList.userId,
        friendId: friendList.friendId,
        user: {
          id: users.id,
          email: users.email,
          name: users.name
        }
      })
      .from(friendList)
      .leftJoin(users, eq(users.id, friendList.friendId))
      .where(eq(friendList.userId, userId));
    return friends;
  },
  delete: async (id: number) => {
    await db.delete(friendList).where(eq(friendList.id, id));
  },
};
