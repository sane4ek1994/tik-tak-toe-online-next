import { prisma } from "@/shared/lib/db";
import { Game, Prisma, User } from "@prisma/client";
import {
  GameEntity,
  GameIdleEntity,
  GameOverEntity,
} from "@/entities/game/domain";

import { z } from "zod";
import { removePassword } from "@/shared/lib/password";

async function gameList(where?: Prisma.GameWhereInput) {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });
  return games.map(dbGameToGameEntity);
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const creatorGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: Array(9).fill(null),
      players: {
        connect: {
          id: game.creator.id,
        },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });
  return dbGameToGameEntity(creatorGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  const players = game.players.map(removePassword);
  switch (game.status) {
    case "idle": {
      const [creator] = players;
      if (!creator) {
        throw new Error("Creator should be game idle");
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case "gameOver": {
      if (!game.winner) {
        throw new Error("Winner should be game over");
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePassword(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = {
  gameList,
  createGame,
};
