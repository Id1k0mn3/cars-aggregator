import Link from "next/link";

import { SignInForm } from "@/src/features/auth";
import { SiteHeader } from "@/src/widgets/site-header";

export function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-slate-500">
            Use your account email and password to continue.
          </p>

          <div className="mt-6">
            <SignInForm />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            New to AutoMarket?{" "}
            <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/sign-up">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
