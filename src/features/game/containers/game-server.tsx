import { GameClient } from "@/features/game/server";
import { GameId } from "@/kernel/ids";
import { getCurrentUser } from "@/entities/user/server";
import { startGame } from "@/entities/game/server";
import { gameEvents } from "@/features/game/services/game-event";

export async function GameServer({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      gameEvents.emit();
    }
  }

  return <GameClient gameId={gameId} />;
}
