import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";
declare const friendshipSchema: Type.TObject<{
    id: Type.TNumber;
    status: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"rejected">]>>;
    addresser: Type.TNumber;
    requester: Type.TNumber;
    createdAt: Type.TOptional<Type.TString>;
    updatedAt: Type.TOptional<Type.TString>;
}>;
export declare const createFriendshipSchemaReq: FastifySchema;
declare const updateFriendship: Type.TObject<{
    status: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"rejected">]>>;
}>;
export declare const updateFriendShipSchemaReq: FastifySchema;
export declare const getFriendship: FastifySchema;
export declare const getFriendByEmailReq: FastifySchema;
declare const createFriendShipType: Type.TObject<{
    createdAt: Type.TOptional<Type.TString>;
    updatedAt: Type.TOptional<Type.TString>;
    requester: Type.TNumber;
    addresser: Type.TNumber;
    status: Type.TOptional<Type.TUnion<[Type.TLiteral<"pending">, Type.TLiteral<"accepted">, Type.TLiteral<"rejected">]>>;
}>;
export type TFriendship = Static<typeof friendshipSchema>;
export type TCreateFriendship = Static<typeof createFriendShipType>;
export type TUpdateFriendship = Static<typeof updateFriendship>;
export {};
//# sourceMappingURL=friendship.schema.d.ts.map