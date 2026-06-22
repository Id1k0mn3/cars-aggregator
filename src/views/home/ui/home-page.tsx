import Link from "next/link";

import {
  bodyTypes,
  featuredCars,
  footerColumns,
  heroStats,
  navigationItems,
  popularBrands,
  quickFilters,
  trustItems,
} from "../model/mock-home-data";
import { FeaturedVehiclesSection } from "./featured-vehicles-section";
import { HomeCategorySection, HomeFilterSection } from "./home-filter-section";
import { HomeHero } from "./home-hero";
import { HomeTrustSection } from "./home-trust-section";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#f0f2f5] text-slate-950">
      <HomeTopbar />
      <HomeHero heroStats={heroStats} />
      <HomeFilterSection quickFilters={quickFilters} />
      <FeaturedVehiclesSection featuredCars={featuredCars} />
      <HomeCategorySection bodyTypes={bodyTypes} popularBrands={popularBrands} />
      <HomeTrustSection trustItems={trustItems} />
      <HomeFooter />
    </main>
  );
};

function HomeTopbar() {
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
            className="min-h-9 rounded-md border border-white/30 px-4 text-sm font-medium text-white"
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

function HomeFooter() {
  return (
    <>
      <footer className="bg-[#1a2b4a] px-4 py-10 text-white sm:px-6 lg:px-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link className="flex items-center gap-2 text-xl font-bold tracking-tight" href="/">
              <span className="size-2.5 rounded-full bg-orange-600" />
              AutoMarket
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
              A vehicle marketplace for Lithuania with curated listings from private sellers and
              official dealers.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-bold uppercase tracking-wide text-white/40">
                {column.title}
              </h3>
              <ul className="mt-4 grid gap-2">
                {column.links.map((footerLink) => (
                  <li key={footerLink}>
                    <Link className="text-sm text-white/60 hover:text-white" href="#">
                      {footerLink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="bg-[#111d2e] px-4 py-4 text-white sm:px-6 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>2026 AutoMarket UAB · Vilnius, Lithuania</p>
          <p>LT · EN · RU</p>
        </div>
      </div>
    </>
  );
}
