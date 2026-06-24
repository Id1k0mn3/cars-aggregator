import { createListingsHref } from "./home-page-links";
import type { HomeFooterColumn, HomeLinkItem, HomeTrustItem } from "./home-page-types";

export const EMPTY_FEED_SUMMARY = "Home feed unavailable. Safe empty sections are shown below.";
export const LIVE_FEED_SUMMARY = "Live car brands, body types, and ads from the current home feed.";

export const homeTrustItems: HomeTrustItem[] = [
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

export const homeFooterColumns: HomeFooterColumn[] = [
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

export const createHomeQuickFilters = (): HomeLinkItem[] => [
  { href: createListingsHref(), label: "All cars" },
  { href: createListingsHref({ price_to: 10000 }), label: "Under 10,000 EUR" },
  { href: createListingsHref({ fuel_type_id: 3 }), label: "Electric" },
  { href: createListingsHref({ fuel_type_id: 2 }), label: "Hybrid" },
  { href: createListingsHref({ body_type_id: 3 }), label: "Hatchback" },
  { href: createListingsHref({ body_type_id: 2 }), label: "SUV / Crossover" },
  { href: createListingsHref({ fuel_type_id: 1 }), label: "Diesel" },
];
