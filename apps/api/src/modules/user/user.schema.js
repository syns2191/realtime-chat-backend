"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.getUserSchema = exports.createUserSchema = exports.UserSchema = void 0;
const typebox_1 = require("typebox");
const commonSchema_1 = require("../../libs/commonSchema");
exports.UserSchema = typebox_1.Type.Object({
    id: commonSchema_1.IdSchema,
    name: commonSchema_1.StringSchema,
    email: commonSchema_1.EmailSchema,
    password: commonSchema_1.PasswordSchema,
    isActive: typebox_1.Type.Boolean(),
    emailVerified: typebox_1.Type.Boolean(),
});
const CreateUserSchema = typebox_1.Type.Omit(exports.UserSchema, ["id"]);
exports.createUserSchema = {
    body: typebox_1.Type.Omit(exports.UserSchema, ["id"]),
    response: {
        201: typebox_1.Type.Omit(exports.UserSchema, ["password"]),
    },
};
const UserQuerySchema = typebox_1.Type.Partial(typebox_1.Type.Pick(exports.UserSchema, ["name", "email"]));
exports.getUserSchema = {
    querystring: UserQuerySchema,
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Omit(exports.UserSchema, ["password"])),
    },
};
const UpdateUserSchema = typebox_1.Type.Partial(typebox_1.Type.Omit(exports.UserSchema, ["id"]));
exports.updateUserSchema = {
    params: typebox_1.Type.Pick(exports.UserSchema, ["id"]),
    body: typebox_1.Type.Partial(typebox_1.Type.Omit(exports.UserSchema, ["id"])),
    response: {
        201: typebox_1.Type.Omit(exports.UserSchema, ["password"]),
    },
};
