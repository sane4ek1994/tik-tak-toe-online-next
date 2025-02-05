/**
 * @module GameStream
 */

import { NextRequest } from "next/server";

/**
 * Создает потоковую передачу игровых данных.
 *
 * @param {NextRequest} res - Запрос Next.js, содержащий информацию о соединении.
 * @returns {Response} Ответ с потоком данных в формате Server-Sent Events (SSE).
 */
export function getGameStream(res: NextRequest) {
  /** @type {TransformStream} Потоковая передача данных. */
  const responseStream = new TransformStream();
  /** @type {WritableStreamDefaultWriter} Записывающий поток. */
  const writer = responseStream.writable.getWriter();
  /** @type {TextEncoder} Кодировщик текста для преобразования строк в Uint8Array. */
  const encoder = new TextEncoder();

  let counter = 1;
  /**
   * Интервал для отправки данных каждые N миллисекунд.
   * @type {NodeJS.Timeout}
   */
  const interval = setInterval(() => {
    writer.write(encoder.encode(`counter: ${counter++}\n`));
  }, 1000); // Интервал в 1 секунду (для примера)

  /**
   * Остановка потока при прерывании запроса.
   */
  res.signal.addEventListener("abort", () => {
    clearInterval(interval);
    writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
