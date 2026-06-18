"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const config_1 = require("../config");
const jwtPlugin = async (fastify) => {
    fastify.register(jwt_1.default, {
        secret: config_1.config.JWT_SECRET || "secret",
    });
    fastify.decorate("authenticate", async (req, reply) => {
        try {
            await req.jwtVerify();
        }
        catch (error) {
            return reply.code(401).send({
                message: "Unauthorize",
            });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(jwtPlugin);
