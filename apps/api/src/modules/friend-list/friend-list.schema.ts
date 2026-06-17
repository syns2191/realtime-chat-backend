import { Type } from "typebox";
import { FastifySchema } from "fastify";

const friendList = {
  id: Type.Number(),
  userId: Type.Number(),
  friendId: Type.Number(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  friend: Type.Optional(
    Type.Object({
      id: Type.Number(),
      name: Type.String(),
      email: Type.String({ format: "email" }),
    }),
  ),
};

export const getFriendListSchemaReq: FastifySchema = {
  response: {
    200: Type.Array(friendList),
  },
};

export const deleteFriend: FastifySchema = {
  response: {
    201: Type.Object({}),
  },
};
