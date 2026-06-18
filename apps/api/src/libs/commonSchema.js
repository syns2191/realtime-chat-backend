"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSchema = exports.IdSchema = exports.DateTimeSchema = exports.EmailSchema = exports.StringSchema = void 0;
const typebox_1 = require("typebox");
exports.StringSchema = typebox_1.Type.String({
    minLength: 1,
    maxLength: 255,
});
exports.EmailSchema = typebox_1.Type.String({
    format: "email",
    minLength: 1,
    maxLength: 255
});
exports.DateTimeSchema = typebox_1.Type.String({
    format: "date-time",
});
exports.IdSchema = typebox_1.Type.Integer({
    minimum: 1,
});
exports.PasswordSchema = typebox_1.Type.String({
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$',
    minLength: 8
});
