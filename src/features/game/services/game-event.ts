import { GameDomain } from "@/entities/game";

type GameEvent = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};

type Listener = (game: GameEvent) => void;

class GameEventsService {
  listeners = new Set<Listener>();

  addListener(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(game: GameDomain.GameEntity) {
    for (const listener of this.listeners) {
      listener({ type: "game-changed", data: game });
    }
  }
}

export const gameEvents = new GameEventsService();
