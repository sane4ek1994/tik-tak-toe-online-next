import { left, mapLeft } from "@/shared/lib/either";
import { z } from "zod";
import { createUser } from "@/entities/user/server";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (state: unknown, formData: FormData) => {
  console.log(formData.get("login"), formData.get("password"));
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);
  if (!result.success) {
    return left(`${result.error.message}`);
  }

  const createUserResult = await createUser(result.data);

  return mapLeft(createUserResult, (error) => {
    return {
      "user-login-exists": "Пользователь с таким login существует",
    }[error];
  });
};
