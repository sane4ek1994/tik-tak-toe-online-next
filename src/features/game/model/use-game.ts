import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";

export function useGame(gameId: GameId) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(
    `/game/${gameId}/stream`,
  );

  return { data: dataStream, isPending };
}
