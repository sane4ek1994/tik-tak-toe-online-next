import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useId } from "react";

export function AuthFields({
  login,
  password,
  onChangeLogin,
  onChangePassword,
}: {
  login: string;
  password: string;
  onChangeLogin: (val: string) => void;
  onChangePassword: (val: string) => void;
}) {
  const loginId = useId();
  const passwordId = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="login"
          required
          value={login}
          onChange={(e) => onChangeLogin(e.target.value)}
          placeholder="Enter your login"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          required
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
    </>
  );
}
