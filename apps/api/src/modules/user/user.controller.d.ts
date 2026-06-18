import { FastifyRequest, FastifyReply } from "fastify";
import { TUserQuery, TCreateUser } from "./user.schema";
export declare const getUserHandler: (req: FastifyRequest<{
    Querystring: TUserQuery;
}>, reply: FastifyReply) => Promise<never>;
export declare const createUserHandler: (req: FastifyRequest<{
    Body: TCreateUser;
}>, reply: FastifyReply) => Promise<never>;
export declare const getCurrentUserHandler: (req: FastifyRequest, reply: FastifyReply) => Promise<never>;
//# sourceMappingURL=user.controller.d.ts.map