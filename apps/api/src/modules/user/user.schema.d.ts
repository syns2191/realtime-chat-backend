import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";
export declare const UserSchema: Type.TObject<{
    id: Type.TInteger;
    name: Type.TString;
    email: Type.TString;
    password: Type.TString;
    isActive: Type.TBoolean;
    emailVerified: Type.TBoolean;
}>;
declare const CreateUserSchema: Type.TObject<{
    email: Type.TString;
    password: Type.TString;
    name: Type.TString;
    isActive: Type.TBoolean;
    emailVerified: Type.TBoolean;
}>;
export declare const createUserSchema: FastifySchema;
declare const UserQuerySchema: Type.TObject<{
    name: Type.TOptional<Type.TString>;
    email: Type.TOptional<Type.TString>;
}>;
export declare const getUserSchema: FastifySchema;
declare const UpdateUserSchema: Type.TObject<{
    email: Type.TOptional<Type.TString>;
    password: Type.TOptional<Type.TString>;
    name: Type.TOptional<Type.TString>;
    isActive: Type.TOptional<Type.TBoolean>;
    emailVerified: Type.TOptional<Type.TBoolean>;
}>;
export declare const updateUserSchema: FastifySchema;
export type TUser = Static<typeof UserSchema>;
export type TCreateUser = Static<typeof CreateUserSchema>;
export type TUpdateUser = Static<typeof UpdateUserSchema>;
export type TUserQuery = Static<typeof UserQuerySchema>;
export {};
//# sourceMappingURL=user.schema.d.ts.map