import { TCreateUser, TUserQuery } from "./user.schema";
export declare const userService: {
    getUsers: (filter: TUserQuery) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    }[]>;
    getUserById: (id: number) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    } | null>;
    create: (user: TCreateUser) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    } | undefined>;
};
//# sourceMappingURL=user.service.d.ts.map