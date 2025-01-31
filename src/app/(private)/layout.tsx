import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";
import { sessionService } from "@/entities/user/services/session";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div>
      <header className="px-10 py-5 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tick-tack-toe-online</div>
        <div className="flex gap-4 items-center">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              "use server";
              console.log("logout");
              await sessionService.deleteSession();
              redirect("/sign-in");
            }}
          >
            <Button>Sign out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
