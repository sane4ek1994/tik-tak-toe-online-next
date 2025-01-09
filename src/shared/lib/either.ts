type Left<E> = {
  type: "error";
  value: E;
};

type Right<V> = {
  type: "success";
  value: V;
};

export type Either<V, E> = Left<E> | Right<V>;
