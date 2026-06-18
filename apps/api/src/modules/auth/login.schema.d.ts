import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";
declare const LoginSchema: Type.TObject<{
    email: Type.TString;
    password: Type.TString;
}>;
declare const UserResponse: Type.TObject<{
    id: Type.TInteger;
    email: Type.TString;
    name: Type.TString;
    isActive: Type.TBoolean;
    emailVerified: Type.TBoolean;
}>;
export declare const LoginReqSchema: FastifySchema;
declare const RegisterSchema: Type.TObject<{
    email: Type.TString;
    password: Type.TString;
    name: Type.TString;
}>;
export declare const RegisterReqSchema: FastifySchema;
export type TLogin = Static<typeof LoginSchema>;
export type TRegister = Static<typeof RegisterSchema>;
export type TUserResponse = Static<typeof UserResponse>;
export {};
//# sourceMappingURL=login.schema.d.ts.map