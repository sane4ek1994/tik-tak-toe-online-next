"use client";

import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { ErrorMessage } from "@/features/auth/ui/error";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { useActionState } from "@/shared/lib/react";
import { signInAction, SignInFormState } from "@/features/auth/actions/sign-in";
import { routes } from "@/kernel/route";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
  );

  return (
    <AuthFormLayout
      title="Sign In"
      action={action}
      description="Welcome back! Please sign in to your account"
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url={routes.signUp()}
        />
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
    />
  );
}
