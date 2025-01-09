import { gameRepository } from "@/entities/game/repositories/game";
import { PlayerEntity } from "../domain";
import cuid from "cuid";
import { left, right } from "@/shared/lib/either";

export const createGame = async (player: PlayerEntity) => {
  const playerGames = await gameRepository.gameList({
    players: { some: { id: player.id } },
    status: "idle",
  });

  const isGameIdleStatus = playerGames.some(
    (game) => game.status === "idle" && game.creator.id == player.id,
  );

  if (isGameIdleStatus) {
    return left("can create only one game" as const);
  }
  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: "idle",
  });

  return right(createdGame);
};
