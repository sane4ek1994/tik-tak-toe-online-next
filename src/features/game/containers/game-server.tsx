import { GameClient } from "@/features/game/server";
import { GameId } from "@/kernel/ids";
import { startGame } from "@/entities/game/server";

export function GameServer({ gameId }: { gameId: GameId }) {
  startGame();
  return <GameClient gameId={gameId} />;
}
