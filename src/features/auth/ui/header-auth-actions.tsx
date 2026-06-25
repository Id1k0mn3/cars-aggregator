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
      <div className="flex flex-wrap items-center gap-2">
        <span className="max-w-44 truncate text-sm font-medium text-white/70">{user.name}</span>
        <button
          className="min-h-9 rounded-md border border-white/15 px-4 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:text-white/45"
          disabled={isLoggingOut}
          onClick={handleLogout}
          type="button"
        >
          {isLoggingOut ? "Signing out..." : "Logout"}
        </button>
      </div>
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
