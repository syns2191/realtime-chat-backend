import { FastifyRequest, FastifyReply } from "fastify";
import { TCreateFriendship } from "./friendship.schema";
export declare const inviteFriendHandler: (req: FastifyRequest<{
    Body: TCreateFriendship;
}>, reply: FastifyReply) => Promise<never>;
export declare const acceptedRequestHandler: (req: FastifyRequest<{
    Params: {
        id: number;
    };
}>, reply: FastifyReply) => Promise<never>;
export declare const rejectRequestHandler: (req: FastifyRequest<{
    Params: {
        id: number;
    };
}>, reply: FastifyReply) => Promise<never>;
export declare const unfriendHandler: (req: FastifyRequest<{
    Params: {
        id: number;
    };
}>, reply: FastifyReply) => Promise<never>;
export declare const getMyFriendHandler: (req: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getInvitingFriendHandler: (req: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getFriendByEmail: (req: FastifyRequest<{
    Querystring: {
        email: string;
    };
}>, reply: FastifyReply) => Promise<never>;
//# sourceMappingURL=friendship.controller.d.ts.map