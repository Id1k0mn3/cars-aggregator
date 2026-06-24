import Link from "next/link";

import { SiteHeader } from "@/src/widgets/site-header";

type VehicleDetailErrorProps = {
  message: string;
  title: string;
};

export function VehicleDetailError({ message, title }: VehicleDetailErrorProps) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-slate-500">{message}</p>
        <Link
          className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          href="/vehicles"
        >
          Back to vehicles
        </Link>
      </section>
    </main>
  );
}
