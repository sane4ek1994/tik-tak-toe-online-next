import { GameEntity } from "@/entities/game";

export function GamePlayers({ game }: { game: GameEntity }) {
  const firstPlayer = game.status === "idle" ? game.creator : game.players[0];

  const secondPlayer = game.status === "idle" ? undefined : game.players[0];

  return (
    <div className="flex flex-grow gap-4 justify-between">
      <div className="text-lg">
        Х- {firstPlayer.login} : {firstPlayer.rating}
      </div>
      <div className="text-lg">
        О- {secondPlayer?.login ?? "..."} : {secondPlayer?.rating ?? "..."}
      </div>
    </div>
  );
}
