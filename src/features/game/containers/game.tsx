"use client";

import { GameLayout } from "@/features/game/server";
import { GamePlayers } from "@/features/game/ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";
import { useEventsSource } from "@/shared/lib/sse/client";

export function Game({ gameId }: { gameId: string }) {
  const { dataStream, error } = useEventsSource(`/game/${gameId}/stream`, 0);

  const game: GameDomain.GameEntity = {
    id: "1",
    players: [
      { id: "1", login: "user-1", rating: 1000 },
      { id: "2", login: "user-2", rating: 99 },
    ],
    status: "gameOver",
    field: [null, null, null, null, null, null, null, "O", "X"],
  };

  return (
    <div>
      {JSON.stringify(dataStream)}
      {error ? "Ошибка подключения" : null}
    </div>
  );
  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
