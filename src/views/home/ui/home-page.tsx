import Link from "next/link";

import { SiteHeader } from "@/src/widgets/site-header";

import type { HomeFooterColumn, HomePageData } from "../model/home-page-types";
import { FeaturedVehiclesSection } from "./featured-vehicles-section";
import { HomeCategorySection, HomeFilterSection } from "./home-filter-section";
import { HomeHero } from "./home-hero";
import { HomeTrustSection } from "./home-trust-section";

type HomePageProps = {
  errorMessage: string | null;
  homePage: HomePageData;
};

export const HomePage = ({ errorMessage, homePage }: HomePageProps) => {
  console.log(errorMessage);
  return (
    <main className="min-h-screen bg-[#f0f2f5] text-slate-950">
      <SiteHeader />
      <HomeHero hero={homePage.hero} />
      {errorMessage ? (
        <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {errorMessage}
          </div>
        </section>
      ) : null}
      <HomeFilterSection quickFilters={homePage.quickFilters} />
      <FeaturedVehiclesSection featuredCars={homePage.featuredVehicles} />
      <HomeCategorySection bodyTypes={homePage.bodyTypes} popularBrands={homePage.carBrands} />
      <HomeTrustSection trustItems={homePage.trustItems} />
      <HomeFooter footerColumns={homePage.footerColumns} />
    </main>
  );
};

type HomeFooterProps = {
  footerColumns: HomeFooterColumn[];
};

function HomeFooter({ footerColumns }: HomeFooterProps) {
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
                    <Link
                      className="text-sm text-white/60 transition-colors hover:text-white"
                      href="#"
                    >
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
