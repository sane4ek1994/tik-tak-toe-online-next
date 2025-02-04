import { GameDomain } from "@/entities/game";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">О- ожидание</div>;
    case "inProgress": {
      const currentSymbol = GameDomain.getGameCurrentStep(game);
      return <div className="text-lg">Ход: {currentSymbol}</div>;
    }
    case "gameOver": {
      const currentSymbol = GameDomain.getGameCurrentStep(game);
      return <div className="text-lg">Победил: {currentSymbol}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">Ничья</div>;
  }
}
