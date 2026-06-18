"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const cors_1 = __importDefault(require("@fastify/cors"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(cors_1.default, {
        origin: (origin, cb) => {
            const allowedOrigins = [
                "http://localhost:3000",
                "http://localhost:5173",
                "https://yourdomain.com",
                "http://localhost:8000"
            ];
            // Allow requests with no origin (mobile apps, curl, Postman)
            if (!origin)
                return cb(null, true);
            if (allowedOrigins.includes(origin)) {
                cb(null, true);
            }
            else {
                cb(new Error("Not allowed by CORS"), false);
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    });
});
