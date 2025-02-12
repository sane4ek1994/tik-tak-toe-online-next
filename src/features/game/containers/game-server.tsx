import { GameClient } from "@/features/game/server";
import { GameId } from "@/kernel/ids";

export function GameServer({ gameId }: { gameId: GameId }) {
  return <GameClient gameId={gameId} />;
}
