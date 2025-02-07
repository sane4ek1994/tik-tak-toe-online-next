import { NextRequest } from "next/server";

/**
 * Создаёт поток SSE (Server-Sent Events) для передачи данных в реальном времени.
 *
 * @param {NextRequest} req - Запрос Next.js, содержащий информацию о соединении.
 * @returns {{
 *   response: Response,
 *   write: (data: unknown) => void,
 *   close: () => Promise<void>,
 *   handleClose: (onDisconnect: () => void) => void
 * }} Объект с потоковым ответом и методами управления соединением.
 */
export const sseStream = (
  req: NextRequest,
): {
  response: Response;
  write: (data: unknown) => void;
  close: () => Promise<void>;
  handleClose: (onDisconnect: () => void) => void;
} => {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  /**
   * Отправляет данные клиенту через SSE.
   *
   * @param {unknown} data - Данные для отправки клиенту.
   */
  const write = (data: unknown) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  /**
   * Обрабатывает закрытие соединения клиентом.
   *
   * @param {() => void} onDisconnect - Функция, вызываемая при разрыве соединения.
   */
  const handleClose = (onDisconnect: () => void) => {
    req.signal.addEventListener("abort", () => {
      console.log("disconnect signal🔴");
      onDisconnect();
    });
  };

  const response = new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });

  /**
   * Закрывает поток SSE.
   *
   * @returns {Promise<void>} Промис, завершающий поток.
   */
  const close = (): Promise<void> => writer.close();

  return { response, write, close, handleClose };
};
