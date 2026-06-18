"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipRepository = void 0;
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const db_1 = require("../../db");
exports.friendshipRepository = {
    findAndFilter: async (id) => {
        const requesterUser = (0, pg_core_1.alias)(schema_1.users, "requester_user");
        const addresserUser = (0, pg_core_1.alias)(schema_1.users, "addresser_user");
        const result = await db_1.db
            .select({
            id: schema_1.friendship.id,
            status: schema_1.friendship.status,
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
            .from(schema_1.friendship)
            .leftJoin(requesterUser, (0, drizzle_orm_1.eq)(requesterUser.id, schema_1.friendship.requester))
            .leftJoin(addresserUser, (0, drizzle_orm_1.eq)(addresserUser.id, schema_1.friendship.addresser))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.friendship.status, "pending"), (0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.friendship.requester, id), (0, drizzle_orm_1.eq)(schema_1.friendship.addresser, id))));
        return result;
    },
    getFriend: async (requester, addresser) => {
        const existFriend = await db_1.db
            .select({ id: schema_1.friendship.id })
            .from(schema_1.friendship)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.friendship.addresser, addresser), (0, drizzle_orm_1.eq)(schema_1.friendship.requester, requester)));
        return existFriend;
    },
    getFriendByEmail: async (email, userId) => {
        const requesterFriend = (0, pg_core_1.alias)(schema_1.friendship, "requester_friendship");
        const addresserFriend = (0, pg_core_1.alias)(schema_1.friendship, "addresser_friendship");
        return db_1.db
            .select({
            id: schema_1.users.id,
            email: schema_1.users.email,
            name: schema_1.users.name,
            friend: schema_1.friendList,
            requester: requesterFriend,
            addresser: addresserFriend,
        })
            .from(schema_1.users)
            .leftJoin(requesterFriend, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(requesterFriend.requester, schema_1.users.id), (0, drizzle_orm_1.eq)(requesterFriend.addresser, userId)))
            .leftJoin(addresserFriend, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(addresserFriend.addresser, schema_1.users.id), (0, drizzle_orm_1.eq)(addresserFriend.requester, userId)))
            .leftJoin(schema_1.friendList, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.friendList.friendId, schema_1.users.id), (0, drizzle_orm_1.eq)(schema_1.friendList.userId, userId)))
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
    },
    createFriendship: async (data) => {
        const friend = await db_1.db
            .insert(schema_1.friendship)
            .values(data)
            .onConflictDoNothing({
            target: [schema_1.friendship.requester, schema_1.friendship.addresser],
        })
            .returning();
        if (friend.length) {
            return friend[0];
        }
        throw Error("Failed invited friend");
    },
    update: async (id, data) => {
        return db_1.db
            .update(schema_1.friendship)
            .set({
            status: data.status,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.friendship.id, id))
            .returning();
    },
};
