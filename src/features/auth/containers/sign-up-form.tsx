"use client";

import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { ErrorMessage } from "@/features/auth/ui/error";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "@/features/auth/actions/sign-up";
import { right } from "@/shared/lib/either";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    right(undefined),
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}>Sign up</SubmitButton>}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign in"
          url="/sign-in"
        />
      }
      error={<ErrorMessage error={formState} />}
    />
  );
}
