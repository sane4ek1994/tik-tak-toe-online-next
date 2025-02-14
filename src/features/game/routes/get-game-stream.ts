import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { GameId } from "@/kernel/ids";
import { getGameById } from "@/entities/game/server";
import { gameEvents } from "@/features/game/services/game-event";

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  console.log(game);

  if (!game) {
    return new Response(`Game not found`, { status: 404 });
  }

  const { response, handleClose, write } = sseStream(req);

  write(game);

  handleClose(
    gameEvents.addListener(game.id, (event) => {
      write(event.data);
    }),
  );

  return response;
}
