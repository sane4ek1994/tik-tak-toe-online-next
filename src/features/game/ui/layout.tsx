import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

export function GameLayout({
  status,
  field,
  players,
}: {
  status?: React.ReactNode;
  field?: React.ReactNode;
  actions?: React.ReactNode;
  players?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Крестики нулики 3х3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
      <CardFooter>actions</CardFooter>
    </Card>
  );
}
