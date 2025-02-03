import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

export function GameStatus({
  status,
  actions,
  field,
}: {
  status?: React.ReactNode;
  field?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Крестики нулики 3х3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {status} {field}
      </CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}
