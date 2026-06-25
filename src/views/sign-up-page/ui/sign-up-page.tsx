import Link from "next/link";

import { SignUpForm } from "@/src/features/auth";
import { SiteHeader } from "@/src/widgets/site-header";

export function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Register with your name, email, and password.
          </p>

          <div className="mt-6">
            <SignUpForm />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
