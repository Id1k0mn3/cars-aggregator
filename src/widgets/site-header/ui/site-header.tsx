import Link from "next/link";

const navigationItems = [
  { label: "Buy cars", href: "/vehicles" },
  { label: "Sell car", href: "/ads/create" },
];

export function SiteHeader() {
  return (
    <header className="bg-[#1a2b4a] px-4 py-4 text-white sm:px-6 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center gap-2 text-xl font-bold tracking-tight" href="/">
          <span className="size-2.5 rounded-full bg-orange-600" />
          AutoMarket
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-white/70">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="min-h-9 cursor-not-allowed rounded-md border border-white/15 px-4 text-sm font-medium text-white/45"
            disabled
            title="Authentication is not available yet"
            type="button"
          >
            Sign in
          </button>
          <Link
            className="inline-flex min-h-9 items-center rounded-md bg-orange-600 px-4 text-sm font-bold text-white"
            href="/ads/create"
          >
            Add listing
          </Link>
        </div>
      </div>
    </header>
  );
}
