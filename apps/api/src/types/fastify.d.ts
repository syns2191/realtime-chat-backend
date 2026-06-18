import "@fastify/jwt";
import { FastifyRequest, FastifyReply } from "fastify";
import { Server } from "socket.io";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number;
      email: string;
      name: string;
    };
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    io: Server;
  }
}
