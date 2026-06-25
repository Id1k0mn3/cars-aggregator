"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { type AuthFieldErrors, getAuthFormErrors } from "../model/auth-errors";
import { useAuthSession } from "../model/auth-session";

const signUpFields = ["name", "email", "password", "password_confirmation"] as const;

type SignUpField = (typeof signUpFields)[number];

const fieldClassName =
  "rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white";

export function SignUpForm() {
  const router = useRouter();
  const { register } = useAuthSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors<SignUpField>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFieldErrors({});
    setGeneralError(null);
    setIsSubmitting(true);

    try {
      await register({
        email,
        name,
        password,
        passwordConfirmation,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      const formErrors = getAuthFormErrors(error, signUpFields);

      setFieldErrors(formErrors.fieldErrors);
      setGeneralError(formErrors.generalError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={submitForm}>
      {generalError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {generalError}
        </div>
      ) : null}

      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</span>
        <input
          autoComplete="name"
          className={fieldClassName}
          name="name"
          onChange={(event) => setName(event.target.value)}
          required
          type="text"
          value={name}
        />
        <FieldErrors messages={fieldErrors.name} />
      </label>

      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</span>
        <input
          autoComplete="email"
          className={fieldClassName}
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <FieldErrors messages={fieldErrors.email} />
      </label>

      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Password
        </span>
        <input
          autoComplete="new-password"
          className={fieldClassName}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        <FieldErrors messages={fieldErrors.password} />
      </label>

      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Confirm password
        </span>
        <input
          autoComplete="new-password"
          className={fieldClassName}
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          type="password"
          value={passwordConfirmation}
        />
        <FieldErrors messages={fieldErrors.password_confirmation} />
      </label>

      <button
        className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}

type FieldErrorsProps = {
  messages?: string[];
};

function FieldErrors({ messages }: FieldErrorsProps) {
  if (messages === undefined || messages.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-1 text-xs text-red-600">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
