"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const start = async () => {
    try {
        await app_1.default.listen({ port: config_1.config.PORT, host: "0.0.0.0" });
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
};
start();
