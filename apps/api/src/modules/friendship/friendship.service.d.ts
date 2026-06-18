import { TCreateFriendship } from "./friendship.schema";
export declare const friendshipService: {
    inviteFriend: (data: TCreateFriendship) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        requester: number;
        addresser: number;
        status: "pending" | "accepted" | "rejected" | null;
    } | undefined>;
    acceptedRequest: (id: number) => Promise<void>;
    rejectRequest: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        requester: number;
        addresser: number;
        status: "pending" | "accepted" | "rejected" | null;
    }[]>;
    unfriend: (id: number) => Promise<void>;
    getMyFriend: (userId: number) => Promise<{
        id: number;
        userId: number;
        friendId: number;
        user: {
            id: number;
            email: string;
            name: string;
        } | null;
    }[]>;
    getInvitingFriend: (userId: number) => Promise<{
        id: number;
        status: "pending" | "accepted" | "rejected" | null;
        requester: {
            id: number;
            name: string;
            email: string;
        } | null;
        addresser: {
            id: number;
            name: string;
            email: string;
        } | null;
    }[]>;
    getFriendByEmail: (email: string, userId: number) => Promise<{
        id: number;
        email: string;
        name: string;
        friend: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            friendId: number;
        } | null;
        requester: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            requester: number;
            addresser: number;
            status: "pending" | "accepted" | "rejected" | null;
        } | null;
        addresser: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            requester: number;
            addresser: number;
            status: "pending" | "accepted" | "rejected" | null;
        } | null;
    }[]>;
};
//# sourceMappingURL=friendship.service.d.ts.map