import { Type, Static } from "typebox";
import { FastifySchema } from "fastify";

const friendshipSchema = Type.Object({
  id: Type.Number(),
  status: Type.Optional(
    Type.Union([
      Type.Literal("pending"),
      Type.Literal("accepted"),
      Type.Literal("rejected"),
    ]),
  ),
  addresser: Type.Number(),
  requester: Type.Number(),
  createdAt: Type.Optional(Type.String({ format: "date-time" })),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
});

const createFriendhsip = Type.Omit(friendshipSchema, ["id", "requester"]);

export const createFriendshipSchemaReq: FastifySchema = {
  body: createFriendhsip,
  response: {
    201: friendshipSchema,
  },
};

const updateFriendship = Type.Pick(friendshipSchema, ["status"]);

export const updateFriendShipSchemaReq: FastifySchema = {
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    201: friendshipSchema,
  },
};

export const getFriendship: FastifySchema = {
  response: {
    201: Type.Array(friendshipSchema),
  },
};

export const getFriendByEmailReq: FastifySchema = {
  querystring: Type.Object({
    email: Type.String({
      format: "email",
    }),
  }),
  response: {
    200: Type.Array(
      Type.Object({
        id: Type.Number(),
        name: Type.String(),
        email: Type.String(),
        friend: Type.Any(),
        addresser: Type.Any(),
        requester: Type.Any()
      }),
    ),
  },
};

const createFriendShipType = Type.Omit(friendshipSchema, ["id"]);

export type TFriendship = Static<typeof friendshipSchema>;
export type TCreateFriendship = Static<typeof createFriendShipType>;
export type TUpdateFriendship = Static<typeof updateFriendship>;
