import { TLogin, TRegister, TUserResponse } from "./login.schema";
export declare const authService: {
    login: (data: TLogin, sign: (payload: {
        id: number;
        email: string;
        type: string;
        name: string;
    }, opt: {
        expiresIn: number;
    }) => string) => Promise<{
        id: number;
        token: string;
        refreshToken: string;
    }>;
    register: (data: TRegister) => Promise<TUserResponse>;
};
//# sourceMappingURL=auth.service.d.ts.map