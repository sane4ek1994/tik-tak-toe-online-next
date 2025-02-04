import { GameEntity } from "@/entities/game";

export function GameStatus({ game }: { game: GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">О- ожидание</div>;
    case "inProgress":
      return <div className="text-lg">{game.status}</div>;
    case "gameOver":
      return <div className="text-lg">О- ожидание</div>;
    case "gameOverDraw":
      return <div className="text-lg">О- ожидание</div>;
  }
}
