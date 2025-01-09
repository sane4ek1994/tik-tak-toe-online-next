"use server";

import { prisma } from "@/shared/lib/db";
import { createGame } from "@/entities/game/server";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst({});

  if (!user) {
    return { type: "error", value: "user not found" } as const;
  }

  const gameResult = await createGame(user);

  return {
    type: "success",
    game: gameResult,
  } as const;
};
