"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_service_1 = require("./auth.service");
const login = async (req, reply) => {
    const loginResult = await auth_service_1.authService.login(req.body, req.server.jwt.sign);
    return reply.code(201).send(loginResult);
};
exports.login = login;
const register = async (req, reply) => {
    const result = await auth_service_1.authService.register(req.body);
    return reply.code(201).send(result);
};
exports.register = register;
