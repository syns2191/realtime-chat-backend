"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_repository_1 = require("../user/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
exports.authService = {
    login: async (data, sign) => {
        const errorAuth = {
            statusCode: 401,
            message: "Your user and password incorrect",
        };
        const user = await user_repository_1.userRepository.findByEmail(data.email);
        if (!user) {
            throw errorAuth;
        }
        const isValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isValid) {
            throw errorAuth;
        }
        if (!user.isActive) {
            throw {
                statusCode: 401,
                message: "Your account not acitve",
            };
        }
        if (!user.emailVerified) {
            throw {
                statusCode: 401,
                message: "Your account not verified",
            };
        }
        const token = sign({
            id: user.id,
            email: user.email,
            name: user.name,
            type: "access",
        }, {
            expiresIn: Number(config_1.config.JWT_EXP),
        });
        const refreshToken = sign({
            id: user.id,
            email: user.email,
            name: user.name,
            type: "refresh",
        }, {
            expiresIn: Number(config_1.config.JWT_EXP),
        });
        return {
            id: user.id,
            token,
            refreshToken,
        };
    },
    register: async (data) => {
        const existing = await user_repository_1.userRepository.findByEmail(data.email);
        if (existing) {
            throw {
                statusCode: 409,
                message: "Email already exists",
            };
        }
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const result = await user_repository_1.userRepository.createUser({
            ...data,
            password: passwordHash,
        });
        return {
            id: result.id,
            name: result.name,
            email: result.email,
            emailVerified: result.emailVerified,
            isActive: result.isActive,
        };
    },
};
