import { FastifyRequest, FastifyReply } from "fastify";
import { TCreatePrivateConversationBody } from "./chat.schema";
export declare const getConversationsByUserId: (req: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getMessagesByConversationId: (req: FastifyRequest<{
    Params: {
        conversationId: number;
    };
}>, reply: FastifyReply) => Promise<never>;
export declare const createPrivateConversation: (req: FastifyRequest<{
    Body: TCreatePrivateConversationBody;
}>, reply: FastifyReply) => Promise<never>;
//# sourceMappingURL=chat.controller.d.ts.map