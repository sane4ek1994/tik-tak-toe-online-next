"use client";

import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { ErrorMessage } from "@/features/auth/ui/error";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { useActionState } from "@/shared/lib/react";
import { signUpAction, SignUpFormState } from "@/features/auth/actions/sign-up";
import { routes } from "@/kernel/route";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUpFormState,
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>Sign up</SubmitButton>}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign in"
          url={routes.signIn()}
        />
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
    />
  );
}
