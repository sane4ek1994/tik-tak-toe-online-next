import { userRepository } from "@/entities/user/repositories/user";
import { left } from "@/shared/lib/either";
import cuid from "cuid";
import { DEFAULT_RATING } from "@/entities/user/domain";
import { passwordService } from "@/entities/user/services/password";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left("user-login-exists");
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  userRepository.saveUser({
    id: cuid(),
    login,
    rating: DEFAULT_RATING,
    passwordHash: hash,
    salt,
  });
};
