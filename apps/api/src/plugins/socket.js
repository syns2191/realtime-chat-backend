"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("../config");
const middleware_1 = require("../socket/middleware");
const scoketPlugin = async (fastify) => {
    const pubClient = new ioredis_1.default({
        port: Number(config_1.config.REDIS_PORT) || 6379,
        host: config_1.config.REDIS_HOST || "localhost",
        password: config_1.config.REDIS_AUTH || undefined,
    });
    const subClient = pubClient.duplicate();
    const io = new socket_io_1.Server(fastify.server, {
        cors: { origin: "*" },
    });
    io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
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
        }
        catch (error) {
            console.error("Socket authentication error:", error);
            next(new Error("Unauthorized"));
        }
    });
    (0, middleware_1.registerSocketMiddleware)(io);
    fastify.decorate("io", io);
};
exports.default = (0, fastify_plugin_1.default)(scoketPlugin);
