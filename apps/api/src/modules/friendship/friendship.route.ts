import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  inviteFriendHandler,
  acceptedRequestHandler,
  rejectRequestHandler,
  unfriendHandler,
  getMyFriendHandler,
  getInvitingFriendHandler,
  getFriendByEmail,
} from "./friendship.controller";
import {
  createFriendshipSchemaReq,
  updateFriendShipSchemaReq,
  getFriendship,
  getFriendByEmailReq,
} from "./friendship.schema";
import { getFriendListSchemaReq } from "../friend-list/friend-list.schema";

const friendshipRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.post(
    "/invite",
    { schema: createFriendshipSchemaReq },
    inviteFriendHandler,
  );

  fastify.patch(
    "/:id/accept",
    { schema: updateFriendShipSchemaReq },
    acceptedRequestHandler,
  );

  fastify.patch(
    "/:id/reject",
    { schema: updateFriendShipSchemaReq },
    rejectRequestHandler,
  );

  fastify.delete("/:id", {}, unfriendHandler);

  fastify.get("/", { schema: getFriendListSchemaReq }, getMyFriendHandler);

  fastify.get(
    "/invitations",
    { schema: getFriendship },
    getInvitingFriendHandler,
  );

  fastify.get(
    "/get-by-email",
    { schema: getFriendByEmailReq },
    getFriendByEmail,
  );
};

export default friendshipRoutes;
