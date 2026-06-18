import { friendList } from "../../db/schema";
type TCreateFriendInput = typeof friendList.$inferInsert;
export declare const friendListRepository: {
    createFriend: (data: TCreateFriendInput[]) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        friendId: number;
    }[]>;
    getAndFilter: (userId: number) => Promise<{
        id: number;
        userId: number;
        friendId: number;
        user: {
            id: number;
            email: string;
            name: string;
        } | null;
    }[]>;
    delete: (id: number) => Promise<void>;
};
export {};
//# sourceMappingURL=friend-list.repository.d.ts.map