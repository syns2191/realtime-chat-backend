"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipService = void 0;
const friendship_repository_1 = require("./friendship.repository");
const friend_list_repository_1 = require("../friend-list/friend-list.repository");
exports.friendshipService = {
    inviteFriend: async (data) => {
        const existingFriend = await friendship_repository_1.friendshipRepository.getFriend(data.requester, data.addresser);
        if (existingFriend.length) {
            throw Error('Friend already invited');
        }
        return friendship_repository_1.friendshipRepository.createFriendship({
            requester: data.requester,
            addresser: data.addresser,
            status: data.status
        });
    },
    acceptedRequest: async (id) => {
        const friendship = await friendship_repository_1.friendshipRepository.update(id, {
            status: "accepted",
        });
        if (!friendship.length) {
            throw Error("Failed update friendship");
        }
        if (friendship[0]?.requester && friendship[0]?.addresser) {
            await friend_list_repository_1.friendListRepository.createFriend([
                {
                    userId: friendship[0]?.requester,
                    friendId: friendship[0]?.addresser,
                },
                {
                    userId: friendship[0]?.addresser,
                    friendId: friendship[0]?.requester,
                },
            ]);
        }
    },
    rejectRequest: async (id) => {
        const friendship = await friendship_repository_1.friendshipRepository.update(id, {
            status: "rejected",
        });
        return friendship;
    },
    unfriend: (id) => {
        return friend_list_repository_1.friendListRepository.delete(id);
    },
    getMyFriend: (userId) => {
        return friend_list_repository_1.friendListRepository.getAndFilter(userId);
    },
    getInvitingFriend: (userId) => {
        return friendship_repository_1.friendshipRepository.findAndFilter(userId);
    },
    getFriendByEmail: (email, userId) => {
        return friendship_repository_1.friendshipRepository.getFriendByEmail(email, userId);
    }
};
