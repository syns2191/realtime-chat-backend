import { userRepository } from "../user/user.repository";
import { TLogin, TRegister, TUserResponse } from "./login.schema";
import bcrypt from "bcrypt";
import { config } from "../../config";

export const authService = {
  login: async (
    data: TLogin,
    sign: (
      payload: { id: number; email: string; type: string, name: string },
      opt: { expiresIn: number },
    ) => string,
  ) => {
    const errorAuth = {
      statusCode: 401,
      message: "Your user and password incorrect",
    };
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw errorAuth;
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw errorAuth;
    }

    if (!user.isActive) {
      throw {
        statusCode: 401,
        message: "Your account not acitve",
      };
    }

    if (!user.emailVerified) {
      throw {
        statusCode: 401,
        message: "Your account not verified",
      };
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        type: "access",
      },
      {
        expiresIn: Number(config.JWT_EXP),
      },
    );

    const refreshToken = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        type: "refresh",
      },
      {
        expiresIn: Number(config.JWT_EXP),
      },
    );

    return {
      id: user.id,
      token,
      refreshToken,
    };
  },
  register: async (data: TRegister): Promise<TUserResponse> => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw {
        statusCode: 409,
        message: "Email already exists",
      };
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const result: any = await userRepository.createUser({
      ...data,
      password: passwordHash,
    });
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      emailVerified: result.emailVerified,
      isActive: result.isActive,
    };
  },
};
