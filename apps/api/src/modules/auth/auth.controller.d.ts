import { FastifyReply, FastifyRequest } from "fastify";
import { TRegister, TLogin } from "./login.schema";
export declare const login: (req: FastifyRequest<{
    Body: TLogin;
}>, reply: FastifyReply) => Promise<never>;
export declare const register: (req: FastifyRequest<{
    Body: TRegister;
}>, reply: FastifyReply) => Promise<never>;
//# sourceMappingURL=auth.controller.d.ts.map