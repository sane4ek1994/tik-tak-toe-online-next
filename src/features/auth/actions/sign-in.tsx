"use server";

import { left, mapLeft } from "@/shared/lib/either";
import { z } from "zod";
import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  console.log(formData.get("login"), formData.get("password"));
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);
  if (!result.success) {
    return left(`Ошибка валидации: ${result.error.message}`);
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);

    redirect("/");
  }

  return mapLeft(createUserResult, (error) => {
    return {
      "user-login-exists": "Пользователь с таким login существует",
    }[error];
  });
};
