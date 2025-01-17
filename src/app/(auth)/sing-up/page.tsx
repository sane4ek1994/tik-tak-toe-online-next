"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { signUp } from "../actions/auth";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import Link from "next/link";

export function SignUpForm() {
  const [state, formAction] = useFormState(signUp, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      action={formAction}
      className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state?.success && (
        <Alert>
          <AlertDescription>{state.success}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
