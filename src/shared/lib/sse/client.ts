import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string, def: T) {
  const [data, setData] = useState<T>(def);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setData(JSON.parse(message.data));
        setError(undefined);
      } catch (e) {
        console.error("events parse error", e);
        setError(e);
      }
    });

    gameEvents.addEventListener("error", (e) => {
      setError(e);
    });

    return () => {
      gameEvents.close();
    };
  }, [url]);

  return { dataStream: data, error };
}
