"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const db_1 = require("../db");
const drizzlePlugin = async (fastify) => {
    fastify.decorate("db", db_1.db);
};
exports.default = (0, fastify_plugin_1.default)(drizzlePlugin);
