import { GameClient } from "@/features/game/server";
import { GameId } from "@/kernel/ids";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "@/features/game/services/game-event";
import { redirect } from "next/navigation";

export async function GameServer({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  if (!game) {
    redirect("/");
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      game = startGameResult.value;
      gameEvents.emit(startGameResult.value);
    }
  }

  return <GameClient defaultGame={game} />;
}
