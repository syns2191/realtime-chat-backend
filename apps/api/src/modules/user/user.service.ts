import { userRepository } from "./user.repository";
import { TCreateUser, TUserQuery } from "./user.schema";
import bcrypt from "bcrypt";

export const userService = {
  getUsers: async (filter: TUserQuery) => {
    return userRepository.findAndFilter(filter);
  },
  getUserById: async (id: number) => {
    return userRepository.findById(id);
  },
  create: async (user: TCreateUser) => {
    const existing = await userRepository.findByEmail(user.email);
    if (existing) {
      throw {
        statusCode: 409,
        message: "Email already exists",
      };
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    const result = await userRepository.createUser({
      ...user,
      password: passwordHash,
    });
    return result;
  },
};
