import { GameId, UserId } from "@/kernel/ids";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  status: "idle";
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOver";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOverDraw";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = Cell[];

export type Cell = GameSymbol | null;

export type GameSymbol = string;
export const GameSymbols = {
  X: "X",
  O: "O",
};
export const getCurrentStep = (game: GameInProgressEntity) => {
  const symbols = game.field.filter((s) => s !== null).length;

  return symbols % 2 === 0 ? GameSymbols.X : GameSymbols.O;
};

export const getNextSymbol = (sameSymbol: GameSymbol) => {
  if (sameSymbol === GameSymbols.X) return GameSymbols.O;
  return GameSymbols.X;
};
