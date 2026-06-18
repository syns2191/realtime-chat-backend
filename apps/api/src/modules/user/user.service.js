"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("./user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userService = {
    getUsers: async (filter) => {
        return user_repository_1.userRepository.findAndFilter(filter);
    },
    getUserById: async (id) => {
        return user_repository_1.userRepository.findById(id);
    },
    create: async (user) => {
        const existing = await user_repository_1.userRepository.findByEmail(user.email);
        if (existing) {
            throw {
                statusCode: 409,
                message: "Email already exists",
            };
        }
        const passwordHash = await bcrypt_1.default.hash(user.password, 10);
        const result = await user_repository_1.userRepository.createUser({
            ...user,
            password: passwordHash,
        });
        return result;
    },
};
