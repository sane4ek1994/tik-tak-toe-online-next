import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";
import { sessionService } from "@/entities/user/services/session";
import { redirect } from "next/navigation";
import { routes } from "@/kernel/route";

/**
 * Форма, предназначенная для удаления текущей пользовательской сессии и перенаправления на страницу авторизации.
 * Использует Server Actions (Next.js 13+):
 * - строка `"use server";` указывает, что логика внутри функции `action` выполняется на сервере;
 * - вызов `sessionService.deleteSession()` удаляет текущую сессию;
 * - после удаления сессии выполняется `redirect("/sign-in")`, чтобы перенаправить пользователя на страницу авторизации.
 *
 * @example
 * <form
 *   action={async () => {
 *     "use server";
 *     await sessionService.deleteSession();
 *     redirect("/sign-in");
 *   }}
 * >
 *   <Button>Sign out</Button>
 * </form>
 *
 * @returns Возвращает HTML-форму с кнопкой, которая по нажатию удаляет сессию и перенаправляет на страницу авторизации.
 */

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="px-10 py-5 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tick-tack-toe-online</div>
        <div className="flex gap-4 items-center">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              "use server";
              await sessionService.deleteSession();
              redirect(routes.signIn());
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
