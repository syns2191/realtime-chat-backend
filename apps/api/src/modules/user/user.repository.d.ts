import { users } from "../../db/schema";
import { TUserQuery } from "./user.schema";
type CreateUserInput = typeof users.$inferInsert;
export declare const userRepository: {
    findAndFilter: (filters: TUserQuery) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    }[]>;
    createUser: (user: CreateUserInput) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    } | undefined>;
    findById: (id: number) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    } | null>;
    findByEmail: (email: string) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        password: string;
        name: string;
        isActive: boolean | null;
        emailVerified: boolean | null;
    } | null>;
    verifiedEmail: (email: string) => Promise<{
        id: number;
        emailVerified: boolean | null;
    }[]>;
};
export {};
//# sourceMappingURL=user.repository.d.ts.map