import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useId } from "react";

export function AuthFields() {
  const loginId = useId();
  const passwordId = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          name="login"
          type="login"
          required
          placeholder="Enter your login"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
    </>
  );
}
