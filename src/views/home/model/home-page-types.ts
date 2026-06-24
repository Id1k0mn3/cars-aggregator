export type HomeStat = {
  label: string;
  value: string;
};

export type HomeLinkItem = {
  href?: string;
  label: string;
};

export type HomeCategoryItem = {
  countLabel: number;
  href: string;
  label: string;
};

export type HomeVehicleCard = {
  brand: string;
  href: string;
  imageUrl?: string;
  priceLabel: string;
  specsLabel: string;
  tags: string[];
  title: string;
};

export type HomeSearchOption = {
  label: string;
  value: string;
};

export type HomeSearchOptions = {
  bodyTypes: HomeSearchOption[];
  carBrands: HomeSearchOption[];
};

export type HomeHeroData = {
  searchOptions: HomeSearchOptions;
  stats: HomeStat[];
  summary: string;
};

export type HomeTrustItem = {
  icon: string;
  text: string;
  title: string;
};

export type HomeFooterColumn = {
  links: string[];
  title: string;
};

export type HomePageData = {
  bodyTypes: HomeCategoryItem[];
  carBrands: HomeCategoryItem[];
  featuredVehicles: HomeVehicleCard[];
  footerColumns: HomeFooterColumn[];
  hero: HomeHeroData;
  quickFilters: HomeLinkItem[];
  trustItems: HomeTrustItem[];
};
