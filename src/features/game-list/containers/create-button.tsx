"use client";
import { Button } from "@/shared/ui/button";
import { createGameAction } from "@/features/game-list/actions/create-game";
import { useActionState } from "@/shared/lib/react";
import { right } from "@/shared/lib/either";

export async function CreateButton() {
  const [data, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <div>
      <Button disabled={isPending} onClick={createGameAction}>
        {data.type === "left"}
      </Button>
    </div>
  );
}
