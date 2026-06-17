import {
  pgTable,
  text,
  boolean,
  pgEnum,
  integer,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { dateFields } from "./common";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const inviteStatusEnum = pgEnum("invite_status_enum", [
  "pending",
  "accepted",
  "rejected",
]);

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  emailVerified: boolean("email_verified").default(false),
  ...dateFields,
});

export const friendship = pgTable("friendship", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  requester: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  addresser: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: inviteStatusEnum(),
  ...dateFields,
}, (table) => [
    uniqueIndex('friendship_user_unique').on(table.requester, table.addresser)
  ]);

export const friendList = pgTable(
  "friend_list",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    friendId: integer("friend_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...dateFields,
  },
  (table) => [
    uniqueIndex("frienlist_user_unique").on(table.friendId, table.userId),
  ],
);
