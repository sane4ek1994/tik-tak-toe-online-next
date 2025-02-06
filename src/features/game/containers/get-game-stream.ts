import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server ";

export function getGameStream(req: NextRequest) {
  const { response, handleClose, write } = sseStream(req);

  let counter = 0;
  const interval = setInterval(() => {
    write(counter++);
  }, 1000);

  handleClose(() => {
    clearInterval(interval);
  });

  return response;
}
