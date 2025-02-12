"use client";

import { GameLayout } from "@/features/game/server";
import { GamePlayers } from "@/features/game/ui/players";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";
import { useGame } from "@/features/game/model/use-game";
import { GameId } from "@/kernel/ids";

export function GameClient({ gameId }: { gameId: GameId }) {
  const { game, isPending } = useGame(gameId);

  if (!game || isPending) {
    return <GameLayout status={"Загрузка..."} />;
  }

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
