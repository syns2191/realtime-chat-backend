"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterReqSchema = exports.LoginReqSchema = void 0;
const typebox_1 = require("typebox");
const commonSchema_1 = require("../../libs/commonSchema");
const user_schema_1 = require("../user/user.schema");
const LoginSchema = typebox_1.Type.Object({
    email: commonSchema_1.EmailSchema,
    password: typebox_1.Type.String(),
});
const UserResponse = typebox_1.Type.Omit(user_schema_1.UserSchema, ["password"]);
exports.LoginReqSchema = {
    body: LoginSchema,
    response: {
        200: UserResponse,
    },
};
const RegisterSchema = typebox_1.Type.Omit(user_schema_1.UserSchema, ["id", "isActive", "emailVerified"]);
exports.RegisterReqSchema = {
    body: RegisterSchema,
    response: {
        201: UserResponse,
    },
};
