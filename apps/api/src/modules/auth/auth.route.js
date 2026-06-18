"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_schema_1 = require("./login.schema");
const auth_controller_1 = require("./auth.controller");
const authRoutes = async (fastify) => {
    fastify.post("/login", { schema: login_schema_1.LoginReqSchema }, auth_controller_1.login);
    fastify.post("/register", { schema: login_schema_1.RegisterReqSchema }, auth_controller_1.register);
};
exports.default = authRoutes;
