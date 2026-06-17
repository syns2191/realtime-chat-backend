import { Type, Static } from "typebox";
import {
  EmailSchema,
  StringSchema,
  IdSchema,
  PasswordSchema,
} from "../../libs/commonSchema";
import { FastifySchema } from "fastify";

export const UserSchema = Type.Object({
  id: IdSchema,
  name: StringSchema,
  email: EmailSchema,
  password: PasswordSchema,
  isActive: Type.Boolean(),
  emailVerified: Type.Boolean(),
});

const CreateUserSchema = Type.Omit(UserSchema, ["id"]);
export const createUserSchema: FastifySchema = {
  body: Type.Omit(UserSchema, ["id"]),
  response: {
    201: Type.Omit(UserSchema, ["password"]),
  },
};

const UserQuerySchema = Type.Partial(Type.Pick(UserSchema, ["name", "email"]));
export const getUserSchema: FastifySchema = {
  querystring: UserQuerySchema,
  response: {
    200: Type.Array(Type.Omit(UserSchema, ["password"])),
  },
};

const UpdateUserSchema = Type.Partial(Type.Omit(UserSchema, ["id"]));
export const updateUserSchema: FastifySchema = {
  params: Type.Pick(UserSchema, ["id"]),
  body: Type.Partial(Type.Omit(UserSchema, ["id"])),
  response: {
    201: Type.Omit(UserSchema, ["password"]),
  },
};

export type TUser = Static<typeof UserSchema>;
export type TCreateUser = Static<typeof CreateUserSchema>;
export type TUpdateUser = Static<typeof UpdateUserSchema>;
export type TUserQuery = Static<typeof UserQuerySchema>;
