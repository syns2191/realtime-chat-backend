import { Pool } from "pg";
import * as Schema from "./schema";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof Schema> & {
    $client: Pool;
};
export type DB = typeof db;
//# sourceMappingURL=index.d.ts.map