import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { GameId } from "@/kernel/ids";
import { getGameById } from "@/entities/game/server";

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

  handleClose(() => {});

  return response;
}
