import { FastifyPluginAsync } from "fastify";
import { DB } from "../db";
declare module "fastify" {
    interface FastifyInstance {
        db: DB;
    }
}
declare const _default: FastifyPluginAsync;
export default _default;
//# sourceMappingURL=drizzle.d.ts.map