import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";
import { routes } from "@/kernel/route";

export function useGame(gameId: GameId) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  return { game: dataStream, isPending };
}
