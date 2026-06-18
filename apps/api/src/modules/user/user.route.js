"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./user.schema");
const userRoutes = async (fastify) => {
    fastify.addHook('onRequest', fastify.authenticate);
    fastify.get("/", { schema: user_schema_1.getUserSchema }, user_controller_1.getUserHandler);
    fastify.post("/", { schema: user_schema_1.createUserSchema }, user_controller_1.createUserHandler);
    fastify.get("/me", {}, user_controller_1.getCurrentUserHandler);
};
exports.default = userRoutes;
