"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = exports.createUserHandler = exports.getUserHandler = void 0;
const user_service_1 = require("./user.service");
const getUserHandler = async (req, reply) => {
    const users = await user_service_1.userService.getUsers(req.query);
    return reply.send(users);
};
exports.getUserHandler = getUserHandler;
const createUserHandler = async (req, reply) => {
    const user = await user_service_1.userService.create(req.body);
    return reply.code(201).send(user);
};
exports.createUserHandler = createUserHandler;
const getCurrentUserHandler = async (req, reply) => {
    const currentUserId = req.user.id;
    const user = await user_service_1.userService.getUserById(currentUserId);
    return reply.code(200).send(user);
};
exports.getCurrentUserHandler = getCurrentUserHandler;
