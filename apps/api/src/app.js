"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("./plugins/cors"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const chat_route_1 = __importDefault(require("./modules/chat/chat.route"));
const friendship_route_1 = __importDefault(require("./modules/friendship/friendship.route"));
const drizzle_1 = __importDefault(require("./plugins/drizzle"));
const jwt_1 = __importDefault(require("./plugins/jwt"));
const socket_1 = __importDefault(require("./plugins/socket"));
const app = (0, fastify_1.default)({ logger: true }).withTypeProvider();
// Plugins
app.register(cors_1.default);
app.register(drizzle_1.default);
app.register(jwt_1.default);
app.register(socket_1.default);
// Routes
app.register(user_route_1.default, { prefix: "/api/users" });
app.register(auth_route_1.default, { prefix: "/api/auth" });
app.register(chat_route_1.default, { prefix: "/api/chat" });
app.register(friendship_route_1.default, { prefix: "/api/friends" });
exports.default = app;
