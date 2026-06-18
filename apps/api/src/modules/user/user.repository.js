"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
exports.userRepository = {
    findAndFilter: async (filters) => {
        const tableColumns = (0, drizzle_orm_1.getTableColumns)(schema_1.users);
        const { password, ...selectionColumn } = tableColumns;
        return db_1.db.select(selectionColumn).from(schema_1.users).limit(20).offset(0).orderBy();
    },
    createUser: async (user) => {
        const tableColumns = (0, drizzle_orm_1.getTableColumns)(schema_1.users);
        const { password, ...selectionColumn } = tableColumns;
        const result = await db_1.db
            .insert(schema_1.users)
            .values(user)
            .returning(selectionColumn);
        return result[0];
    },
    findById: async (id) => {
        const tableColumns = (0, drizzle_orm_1.getTableColumns)(schema_1.users);
        const { password, ...selectionColumn } = tableColumns;
        const result = await db_1.db
            .select(selectionColumn)
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .limit(1);
        return result[0] ?? null;
    },
    findByEmail: async (email) => {
        const result = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .limit(1);
        return result[0] ?? null;
    },
    verifiedEmail: async (email) => {
        const result = await db_1.db
            .update(schema_1.users)
            .set({
            emailVerified: true,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .returning({
            id: schema_1.users.id,
            emailVerified: schema_1.users.emailVerified,
        });
        return result;
    },
};
