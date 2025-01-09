type Left<E> = {
  type: "left";
  value: E;
};

type Right<V> = {
  type: "right";
  value: V;
};

export type Either<V, E> = Left<E> | Right<V>;
export const left = <E>(error: E): Left<E> => ({ type: "left", value: error });
export const right = <V>(value: V): Right<V> => ({ type: "right", value });

export const mapEither = <V, V2, E = unknown>(
  either: Either<V, E>,
  fn: (value: V) => V2,
): Either<V2, E> => {
  if (either.type === "right") {
    return { type: "right", value: fn(either.value) };
  }

  return either;
};
