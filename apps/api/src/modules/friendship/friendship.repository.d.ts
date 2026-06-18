import { friendship } from "../../db/schema";
type TCreateFriendshipInput = typeof friendship.$inferInsert;
export declare const friendshipRepository: {
    findAndFilter: (id: number) => Promise<{
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
    getFriend: (requester: number, addresser: number) => Promise<{
        id: number;
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
    createFriendship: (data: TCreateFriendshipInput) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        requester: number;
        addresser: number;
        status: "pending" | "accepted" | "rejected" | null;
    } | undefined>;
    update: (id: number, data: Partial<TCreateFriendshipInput>) => Promise<(typeof friendship.$inferSelect)[]>;
};
export {};
//# sourceMappingURL=friendship.repository.d.ts.map