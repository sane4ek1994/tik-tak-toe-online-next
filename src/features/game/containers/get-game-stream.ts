import { NextRequest } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";

export function getGameStream(req: NextRequest) {
  const { response, handleClose, write } = sseStream(req);

  let counter = 0;
  const innterval = setInterval(() => {
    write(counter++);
  }, 1000);

  handleClose(() => {
    clearInterval(innterval);
  });

  return { response };
}
