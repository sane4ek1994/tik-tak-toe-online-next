import { userRepository } from "@/entities/user/repositories/user";
import { left, right } from "@/shared/lib/either";
import { passwordService } from "@/entities/user/services/password";

export async function verifyUserPassword({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const user = await userRepository.getUser({ login });

  if (!user) {
    return left("user-wrong-password" as const);
  }

  const isCompare = await passwordService.comparePassword({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isCompare) {
    return left("user-wrong-password" as const);
  }

  return right(user);
}
