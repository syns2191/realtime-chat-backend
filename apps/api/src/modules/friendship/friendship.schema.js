"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendByEmailReq = exports.getFriendship = exports.updateFriendShipSchemaReq = exports.createFriendshipSchemaReq = void 0;
const typebox_1 = require("typebox");
const friendshipSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    status: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("pending"),
        typebox_1.Type.Literal("accepted"),
        typebox_1.Type.Literal("rejected"),
    ])),
    addresser: typebox_1.Type.Number(),
    requester: typebox_1.Type.Number(),
    createdAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date-time" })),
    updatedAt: typebox_1.Type.Optional(typebox_1.Type.String({ format: "date-time" })),
});
const createFriendhsip = typebox_1.Type.Omit(friendshipSchema, ["id", "requester"]);
exports.createFriendshipSchemaReq = {
    body: createFriendhsip,
    response: {
        201: friendshipSchema,
    },
};
const updateFriendship = typebox_1.Type.Pick(friendshipSchema, ["status"]);
exports.updateFriendShipSchemaReq = {
    params: typebox_1.Type.Object({
        id: typebox_1.Type.Number(),
    }),
    response: {
        201: friendshipSchema,
    },
};
exports.getFriendship = {
    response: {
        201: typebox_1.Type.Array(friendshipSchema),
    },
};
exports.getFriendByEmailReq = {
    querystring: typebox_1.Type.Object({
        email: typebox_1.Type.String({
            format: "email",
        }),
    }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Number(),
            name: typebox_1.Type.String(),
            email: typebox_1.Type.String(),
            friend: typebox_1.Type.Any(),
            addresser: typebox_1.Type.Any(),
            requester: typebox_1.Type.Any()
        })),
    },
};
const createFriendShipType = typebox_1.Type.Omit(friendshipSchema, ["id"]);
