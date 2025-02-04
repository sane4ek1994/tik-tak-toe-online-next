import { GameLayout } from "@/features/game/server";
import { GamePlayers } from "@/features/game/ui/players";
import { GameEntity } from "@/entities/game";

export function Game({ gameId }: { gameId: string }) {
  const game: GameEntity = {
    id: "1",
    creator: { id: "1", login: "user-1", rating: 1000 },
    status: "idle",
  };

  return <GameLayout players={<GamePlayers game={game} />} />;
}
