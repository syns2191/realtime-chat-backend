import { TCreateFriendship } from "./friendship.schema";
import { friendshipRepository } from "./friendship.repository";
import { friendListRepository } from "../friend-list/friend-list.repository";

export const friendshipService = {
  inviteFriend: async (data: TCreateFriendship) => {
    const existingFriend = await friendshipRepository.getFriend(data.requester, data.addresser);
    if (existingFriend.length) {
      throw Error('Friend already invited');
    }
    return friendshipRepository.createFriendship({
      requester: data.requester,
      addresser: data.addresser,
      status: data.status
    });
  },
  acceptedRequest: async (id: number) => {
    const friendship = await friendshipRepository.update(id, {
      status: "accepted",
    });

    if (!friendship.length) {
      throw Error("Failed update friendship");
    }

    if (friendship[0]?.requester && friendship[0]?.addresser) {
      await friendListRepository.createFriend([
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
  rejectRequest: async (id: number) => {
    const friendship = await friendshipRepository.update(id, {
      status: "rejected",
    });
    return friendship;
  },
  unfriend: (id: number) => {
    return friendListRepository.delete(id);
  },
  getMyFriend: (userId: number) => {
    return friendListRepository.getAndFilter(userId);
  },
  getInvitingFriend: (userId: number) => {
    return friendshipRepository.findAndFilter(userId);
  },
  getFriendByEmail: (email: string, userId: number) => {
    return friendshipRepository.getFriendByEmail(email, userId);
  }
};
