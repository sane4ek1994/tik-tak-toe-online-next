"use client";

import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { useState } from "react";
import { ErrorMessage } from "@/features/auth/ui/error";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { useRouter } from "next/navigation";
import { right } from "@/shared/lib/either";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Here you would typically send a request to your backend to create the user
    // For this example, we'll just simulate a successful sign-up
    console.log("User signed up:", email);
    setError("Account created successfully!");

    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      fields={<AuthFields />}
      actions={<SubmitButton>Sign up</SubmitButton>}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url="/sign-up"
        />
      }
      error={<ErrorMessage error={right(null)} />}
    />
  );
}
