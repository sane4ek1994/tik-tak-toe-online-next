import { gameRepository } from "@/entities/game/repositories/game";
import { GameIdleEntity } from "../domain";

export const createGame = async (): Promise<GameIdleEntity[]> => {
  const games = await gameRepository.gameList({
    status: "idle",
  });

  return games as GameIdleEntity[];
};
