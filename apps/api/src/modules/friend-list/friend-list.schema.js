"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.getFriendListSchemaReq = void 0;
const typebox_1 = require("typebox");
const friendList = {
    id: typebox_1.Type.Number(),
    userId: typebox_1.Type.Number(),
    friendId: typebox_1.Type.Number(),
    createdAt: typebox_1.Type.String({ format: "date-time" }),
    updatedAt: typebox_1.Type.String({ format: "date-time" }),
    friend: typebox_1.Type.Optional(typebox_1.Type.Object({
        id: typebox_1.Type.Number(),
        name: typebox_1.Type.String(),
        email: typebox_1.Type.String({ format: "email" }),
    })),
};
exports.getFriendListSchemaReq = {
    response: {
        200: typebox_1.Type.Array(friendList),
    },
};
exports.deleteFriend = {
    response: {
        201: typebox_1.Type.Object({}),
    },
};
