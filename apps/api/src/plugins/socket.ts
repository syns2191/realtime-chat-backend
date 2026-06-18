import fp from "fastify-plugin";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { FastifyPluginAsync } from "fastify";
import { registerSocketMiddleware } from "../socket/middleware";

const scoketPlugin: FastifyPluginAsync = async (fastify) => {
  const pubClient = fastify.redis;
  const subClient = pubClient.duplicate();

  const io = new Server(fastify.server, {
    cors: { origin: "*" },
  });

  io.adapter(createAdapter(pubClient, subClient));

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token ?? socket.handshake.headers?.authorization;
      console.log("Socket auth token: ====", socket.handshake.auth);
      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = fastify.jwt.verify(token);
      socket.data.user = decoded;
      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Unauthorized"));
    }
  });
  registerSocketMiddleware(io);
  fastify.decorate("io", io);
};

export default fp(scoketPlugin);
