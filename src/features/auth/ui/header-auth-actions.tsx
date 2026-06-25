"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthSession } from "../model/auth-session";

export function HeaderAuthActions() {
  const router = useRouter();
  const { logout, status, user } = useAuthSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    router.push("/sign-in");
    router.refresh();
  };

  if (status === "initializing") {
    return (
      <span className="inline-flex min-h-9 items-center rounded-md border border-white/15 px-4 text-sm font-medium text-white/45">
        Checking session
      </span>
    );
  }

  if (status === "authenticated" && user !== null) {
    return (
      <details className="relative">
        <summary className="flex min-h-9 list-none items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white [&::-webkit-details-marker]:hidden">
          <span className="max-w-56 truncate">{user.email}</span>
          <span aria-hidden="true" className="text-xs text-white/45">
            v
          </span>
        </summary>

        <div className="absolute right-0 z-20 mt-2 grid min-w-56 overflow-hidden rounded-md border border-slate-200 bg-white py-1 text-sm text-slate-700 shadow-lg">
          <Link
            className="px-4 py-2.5 font-medium transition-colors hover:bg-slate-50 hover:text-blue-700"
            href="/ads/create"
          >
            Add listing
          </Link>
          <button
            className="px-4 py-2.5 text-left font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-400"
            disabled={isLoggingOut}
            onClick={handleLogout}
            type="button"
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </details>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        className="inline-flex min-h-9 items-center rounded-md border border-white/15 px-4 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
        href="/sign-in"
      >
        Sign in
      </Link>
      <Link
        className="inline-flex min-h-9 items-center rounded-md bg-white px-4 text-sm font-bold text-[#1a2b4a] transition-colors hover:bg-white/90"
        href="/sign-up"
      >
        Sign up
      </Link>
    </div>
  );
}
