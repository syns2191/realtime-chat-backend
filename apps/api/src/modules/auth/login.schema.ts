import { Type, Static } from "typebox";
import { EmailSchema } from "../../libs/commonSchema";
import { FastifySchema } from "fastify";
import { UserSchema } from "../user/user.schema";

const LoginSchema = Type.Object({
  email: EmailSchema,
  password: Type.String(),
});

const UserResponse = Type.Omit(UserSchema, ["password"]);
export const LoginReqSchema: FastifySchema = {
  body: LoginSchema,
  response: {
    200: UserResponse,
  },
};

const RegisterSchema = Type.Omit(UserSchema, ["id", "isActive", "emailVerified"]);
export const RegisterReqSchema: FastifySchema = {
  body: RegisterSchema,
  response: {
    201: UserResponse,
  },
};

export type TLogin = Static<typeof LoginSchema>;
export type TRegister = Static<typeof RegisterSchema>;
export type TUserResponse = Static<typeof UserResponse>;
