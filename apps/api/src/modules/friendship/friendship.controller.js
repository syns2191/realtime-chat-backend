"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendByEmail = exports.getInvitingFriendHandler = exports.getMyFriendHandler = exports.unfriendHandler = exports.rejectRequestHandler = exports.acceptedRequestHandler = exports.inviteFriendHandler = void 0;
const friendship_service_1 = require("./friendship.service");
const inviteFriendHandler = async (req, reply) => {
    const friendship = await friendship_service_1.friendshipService.inviteFriend({
        requester: req.user.id,
        addresser: req.body.addresser,
        status: "pending",
    });
    return reply.code(201).send(friendship);
};
exports.inviteFriendHandler = inviteFriendHandler;
const acceptedRequestHandler = async (req, reply) => {
    await friendship_service_1.friendshipService.acceptedRequest(req.params.id);
    return reply.code(200).send({ message: "Friend request accepted" });
};
exports.acceptedRequestHandler = acceptedRequestHandler;
const rejectRequestHandler = async (req, reply) => {
    const friendship = await friendship_service_1.friendshipService.rejectRequest(req.params.id);
    return reply.code(200).send(friendship);
};
exports.rejectRequestHandler = rejectRequestHandler;
const unfriendHandler = async (req, reply) => {
    await friendship_service_1.friendshipService.unfriend(req.params.id);
    return reply.code(200).send({ message: "Unfriended successfully" });
};
exports.unfriendHandler = unfriendHandler;
const getMyFriendHandler = async (req, reply) => {
    const friends = await friendship_service_1.friendshipService.getMyFriend(req.user.id);
    return reply.code(200).send(friends);
};
exports.getMyFriendHandler = getMyFriendHandler;
const getInvitingFriendHandler = async (req, reply) => {
    const invitations = await friendship_service_1.friendshipService.getInvitingFriend(req.user.id);
    return reply.code(200).send(invitations);
};
exports.getInvitingFriendHandler = getInvitingFriendHandler;
const getFriendByEmail = async (req, reply) => {
    const friend = await friendship_service_1.friendshipService.getFriendByEmail(req.query.email, req.user.id);
    return reply.code(200).send(friend);
};
exports.getFriendByEmail = getFriendByEmail;
