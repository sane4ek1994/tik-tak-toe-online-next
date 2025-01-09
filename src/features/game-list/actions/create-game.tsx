"use server";

import { prisma } from "@/shared/lib/db";
import { createGame } from "@/entities/game/server";
import { left } from "@/shared/lib/either";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst({});

  if (!user) {
    return left("user not found" as const);
  }

  const gameResult = await createGame(user);

  return {
    type: "success",
    game: gameResult,
  } as const;
};
