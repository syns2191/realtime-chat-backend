import Fastify from "fastify";
import corsPlugin from "./plugins/cors";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import chatRoutes from "./modules/chat/chat.route";
import friendshipRoutes from "./modules/friendship/friendship.route";
import drizzlePlugin from "./plugins/drizzle";
import jwtPlugin from "./plugins/jwt";
import socketPlugin from "./plugins/socket";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

// Plugins
app.register(corsPlugin);
app.register(drizzlePlugin);
app.register(jwtPlugin);
app.register(socketPlugin);
// Routes
app.register(userRoutes, { prefix: "/api/users" });
app.register(authRoutes, { prefix: "/api/auth" });
app.register(chatRoutes, { prefix: "/api/chat" });
app.register(friendshipRoutes, { prefix: "/api/friends" });

export default app;
