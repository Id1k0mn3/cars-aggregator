import Link from "next/link";

import { SiteHeader } from "@/src/widgets/site-header";

import type {
  HomeFooterColumn,
  HomeHeroStat,
  HomePageViewModel,
  HomeQuickFilter,
  HomeTrustItem,
} from "../model/home-page-types";
import { FeaturedVehiclesSection } from "./featured-vehicles-section";
import { HomeCategorySection, HomeFilterSection } from "./home-filter-section";
import { HomeHero } from "./home-hero";
import { HomeTrustSection } from "./home-trust-section";

type HomePageProps = {
  errorMessage: string | null;
  homePage: HomePageViewModel;
};

const quickFilters: HomeQuickFilter[] = [
  { href: "/vehicles", label: "All cars" },
  { href: "/vehicles?price_to=10000", label: "Under 10,000 EUR" },
  { label: "Up to 5 years" },
  { href: "/vehicles?fuel_type_id=3", label: "Electric" },
  { href: "/vehicles?fuel_type_id=2", label: "Hybrid" },
  { href: "/vehicles?body_type_id=3", label: "Hatchback" },
  { href: "/vehicles?body_type_id=2", label: "SUV / Crossover" },
  { href: "/vehicles?fuel_type_id=1", label: "Diesel" },
  { label: "Automatic" },
  { label: "One owner" },
];

const trustItems: HomeTrustItem[] = [
  {
    icon: "Verified",
    text: "Dealers are reviewed and buyer feedback is visible before contact.",
    title: "Verified sellers",
  },
  {
    icon: "History",
    text: "Check VIN, mileage, service records, and accident history before buying.",
    title: "Vehicle history",
  },
  {
    icon: "Finance",
    text: "Compare financing and leasing options from the listing page.",
    title: "Credit and leasing",
  },
  {
    icon: "Secure",
    text: "Practical guidance for safer payments, inspections, and handover.",
    title: "Safer deals",
  },
];

const footerColumns: HomeFooterColumn[] = [
  {
    links: ["Search cars", "Compare cars", "Check VIN", "Loan calculator"],
    title: "Buyers",
  },
  {
    links: ["Place an ad", "VIP placement", "For dealers", "Estimate car"],
    title: "Sellers",
  },
  {
    links: ["About us", "Contacts", "Terms of use", "Privacy policy"],
    title: "Company",
  },
];

const createHeroStats = (homePage: HomePageViewModel): HomeHeroStat[] => [
  { label: "Brands", value: new Intl.NumberFormat("en-US").format(homePage.brands.length) },
  { label: "Body types", value: new Intl.NumberFormat("en-US").format(homePage.bodies.length) },
  { label: "Ads", value: new Intl.NumberFormat("en-US").format(homePage.ads.length) },
  { label: "Live feed", value: homePage.ads.length > 0 ? "Ready" : "Empty" },
];

export const HomePage = ({ errorMessage, homePage }: HomePageProps) => {
  const heroStats = createHeroStats(homePage);
  const summary = errorMessage
    ? "Home feed unavailable. Safe empty sections are shown below."
    : "Live brands, body types, and ads from the current home feed.";

  return (
    <main className="min-h-screen bg-[#f0f2f5] text-slate-950">
      <SiteHeader />
      <HomeHero heroStats={heroStats} summary={summary} />
      {errorMessage ? (
        <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {errorMessage}
          </div>
        </section>
      ) : null}
      <HomeFilterSection quickFilters={quickFilters} />
      <FeaturedVehiclesSection featuredCars={homePage.ads} />
      <HomeCategorySection bodyTypes={homePage.bodies} popularBrands={homePage.brands} />
      <HomeTrustSection trustItems={trustItems} />
      <HomeFooter />
    </main>
  );
};

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
