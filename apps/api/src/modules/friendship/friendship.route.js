"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const friendship_controller_1 = require("./friendship.controller");
const friendship_schema_1 = require("./friendship.schema");
const friend_list_schema_1 = require("../friend-list/friend-list.schema");
const friendshipRoutes = async (fastify) => {
    fastify.addHook("onRequest", fastify.authenticate);
    fastify.post("/invite", { schema: friendship_schema_1.createFriendshipSchemaReq }, friendship_controller_1.inviteFriendHandler);
    fastify.patch("/:id/accept", { schema: friendship_schema_1.updateFriendShipSchemaReq }, friendship_controller_1.acceptedRequestHandler);
    fastify.patch("/:id/reject", { schema: friendship_schema_1.updateFriendShipSchemaReq }, friendship_controller_1.rejectRequestHandler);
    fastify.delete("/:id", {}, friendship_controller_1.unfriendHandler);
    fastify.get("/", { schema: friend_list_schema_1.getFriendListSchemaReq }, friendship_controller_1.getMyFriendHandler);
    fastify.get("/invitations", { schema: friendship_schema_1.getFriendship }, friendship_controller_1.getInvitingFriendHandler);
    fastify.get("/get-by-email", { schema: friendship_schema_1.getFriendByEmailReq }, friendship_controller_1.getFriendByEmail);
};
exports.default = friendshipRoutes;
