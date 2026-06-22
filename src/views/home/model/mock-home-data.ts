export type FeaturedCar = {
  badge?: {
    label: string;
    tone: "green" | "orange" | "blue";
  };
  brand: string;
  gradient: string;
  location: string;
  name: string;
  price: string;
  specs: string;
  tags: string[];
};

export type FooterColumn = {
  links: string[];
  title: string;
};

export type HeroStat = {
  label: string;
  value: string;
};

export type HomeTile = {
  count?: string;
  icon?: string;
  label?: string;
  logo?: string;
  name?: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type TrustItem = {
  icon: string;
  text: string;
  title: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "/products", label: "Buy cars" },
  { href: "/ads/create", label: "Sell car" },
  { href: "#", label: "Estimate car" },
  { href: "#", label: "Dealers" },
  { href: "#", label: "New cars" },
];

export const heroStats: HeroStat[] = [
  { label: "Listings", value: "47,312" },
  { label: "Dealers", value: "1,840" },
  { label: "Makes and models", value: "3,100+" },
  { label: "Happy buyers", value: "98%" },
];

export const quickFilters = [
  "All cars",
  "Under 10,000 EUR",
  "Up to 5 years",
  "Electric",
  "Hybrid",
  "Hatchback",
  "SUV / Crossover",
  "Diesel",
  "Automatic",
  "One owner",
];

export const featuredCars: FeaturedCar[] = [
  {
    badge: { label: "New", tone: "blue" },
    brand: "BMW",
    gradient: "from-sky-200 via-blue-300 to-blue-500",
    location: "Vilnius",
    name: "5 Series 530d xDrive",
    price: "29,900 EUR",
    specs: "2022 · 48,000 km · Diesel · Auto",
    tags: ["4x4"],
  },
  {
    badge: { label: "Hybrid", tone: "green" },
    brand: "Toyota",
    gradient: "from-emerald-100 via-teal-200 to-cyan-400",
    location: "Kaunas",
    name: "Camry 2.5 Hybrid Comfort",
    price: "22,500 EUR",
    specs: "2021 · 62,000 km · Hybrid · Auto",
    tags: ["Eco"],
  },
  {
    badge: { label: "VIP", tone: "orange" },
    brand: "Mercedes-Benz",
    gradient: "from-orange-100 via-amber-200 to-rose-300",
    location: "Klaipeda",
    name: "GLE 400d AMG Line",
    price: "64,000 EUR",
    specs: "2023 · 18,000 km · Diesel · Auto",
    tags: ["AMG"],
  },
  {
    brand: "Volkswagen",
    gradient: "from-violet-100 via-indigo-200 to-slate-400",
    location: "Siauliai",
    name: "Golf 1.5 TSI Life Plus",
    price: "14,200 EUR",
    specs: "2020 · 85,000 km · Petrol · Manual",
    tags: ["CarPlay"],
  },
];

export const bodyTypes: HomeTile[] = [
  { count: "8,420 listings", icon: "Sedan", label: "Sedan" },
  { count: "11,200 listings", icon: "SUV", label: "Crossover" },
  { count: "6,870 listings", icon: "Hatch", label: "Hatchback" },
  { count: "4,130 listings", icon: "Wagon", label: "Wagon" },
  { count: "2,950 listings", icon: "Van", label: "Minivan" },
  { count: "830 listings", icon: "Open", label: "Convertible" },
];

export const popularBrands: HomeTile[] = [
  { logo: "BMW", name: "BMW" },
  { logo: "VW", name: "Volkswagen" },
  { logo: "MB", name: "Mercedes" },
  { logo: "AUDI", name: "Audi" },
  { logo: "TOYO", name: "Toyota" },
  { logo: "SKODA", name: "Skoda" },
  { logo: "VOLVO", name: "Volvo" },
  { logo: "FORD", name: "Ford" },
];

export const trustItems: TrustItem[] = [
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

export const footerColumns: FooterColumn[] = [
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
