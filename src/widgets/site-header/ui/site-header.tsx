import Link from "next/link";

const navigationItems = [
  { label: "Buy cars", href: "/vehicles" },
  { label: "Sell car", href: "/ads/create" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link className="text-xl font-semibold tracking-tight text-zinc-950" href="/">
          Cars Aggregator
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-zinc-700">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link className="transition-colors hover:text-zinc-950" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
            type="button"
          >
            Sign in
          </button>
          <Link
            className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
            href="/vehicles"
          >
            Buy cars
          </Link>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            href="/ads/create"
          >
            Add ad
          </Link>
        </div>
      </div>
    </header>
  );
}
