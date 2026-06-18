"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendList = exports.friendship = exports.users = exports.inviteStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const common_1 = require("./common");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["USER", "ADMIN"]);
exports.inviteStatusEnum = (0, pg_core_1.pgEnum)("invite_status_enum", [
    "pending",
    "accepted",
    "rejected",
]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    email: (0, pg_core_1.varchar)("email").unique().notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true),
    emailVerified: (0, pg_core_1.boolean)("email_verified").default(false),
    ...common_1.dateFields,
});
exports.friendship = (0, pg_core_1.pgTable)("friendship", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    requester: (0, pg_core_1.integer)()
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    addresser: (0, pg_core_1.integer)()
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    status: (0, exports.inviteStatusEnum)(),
    ...common_1.dateFields,
}, (table) => [
    (0, pg_core_1.uniqueIndex)('friendship_user_unique').on(table.requester, table.addresser)
]);
exports.friendList = (0, pg_core_1.pgTable)("friend_list", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    friendId: (0, pg_core_1.integer)("friend_id")
        .notNull()
        .references(() => exports.users.id, { onDelete: "cascade" }),
    ...common_1.dateFields,
}, (table) => [
    (0, pg_core_1.uniqueIndex)("frienlist_user_unique").on(table.friendId, table.userId),
]);
