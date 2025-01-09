import { Button } from "@/shared/ui/button";

export async function CreateButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return <Button>Создать игру</Button>;
}
