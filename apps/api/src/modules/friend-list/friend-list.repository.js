"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendListRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
exports.friendListRepository = {
    createFriend: async (data) => {
        return db_1.db
            .insert(schema_1.friendList)
            .values(data)
            .onConflictDoNothing({ target: [schema_1.friendList.userId, schema_1.friendList.friendId] })
            .returning();
    },
    getAndFilter: async (userId) => {
        const friends = await db_1.db
            .select({
            id: schema_1.friendList.id,
            userId: schema_1.friendList.userId,
            friendId: schema_1.friendList.friendId,
            user: {
                id: schema_1.users.id,
                email: schema_1.users.email,
                name: schema_1.users.name
            }
        })
            .from(schema_1.friendList)
            .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.users.id, schema_1.friendList.friendId))
            .where((0, drizzle_orm_1.eq)(schema_1.friendList.userId, userId));
        return friends;
    },
    delete: async (id) => {
        await db_1.db.delete(schema_1.friendList).where((0, drizzle_orm_1.eq)(schema_1.friendList.id, id));
    },
};
