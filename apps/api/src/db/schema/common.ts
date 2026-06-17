import { customType, timestamp } from "drizzle-orm/pg-core";
export const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

export const dateFields = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}
