import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { TUserQuery } from "./user.schema";

type CreateUserInput = typeof users.$inferInsert;

export const userRepository = {
  findAndFilter: async (filters: TUserQuery) => {
    const tableColumns = getTableColumns(users);
    const { password, ...selectionColumn } = tableColumns;
    return db.select(selectionColumn).from(users).limit(20).offset(0).orderBy();
  },
  createUser: async (user: CreateUserInput) => {
    const tableColumns = getTableColumns(users);
    const { password, ...selectionColumn } = tableColumns;
    const result = await db
      .insert(users)
      .values(user)
      .returning(selectionColumn);
    return result[0];
  },
  findById: async (id: number) => {
    const tableColumns = getTableColumns(users);
    const { password, ...selectionColumn } = tableColumns;
    const result = await db
      .select(selectionColumn)
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] ?? null;
  },
  findByEmail: async (email: string) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0] ?? null;
  },
  verifiedEmail: async (email: string) => {
    const result = await db
      .update(users)
      .set({
        emailVerified: true,
      })
      .where(eq(users.email, email))
      .returning({
        id: users.id,
        emailVerified: users.emailVerified,
      });
    return result;
  },
};
