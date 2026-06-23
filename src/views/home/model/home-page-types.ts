export type HomeNavigationItem = {
  href: string;
  label: string;
};

export type HomeHeroStat = {
  label: string;
  value: string;
};

export type HomeQuickFilter = {
  href?: string;
  label: string;
};

export type HomeFooterColumn = {
  links: string[];
  title: string;
};

export type HomeTrustItem = {
  icon: string;
  text: string;
  title: string;
};

export type HomeBodyTile = {
  countLabel: number;
  href: string;
  label: string;
};

export type HomeBrandTile = {
  countLabel: number;
  href: string;
  label: string;
};

export type HomeAdCard = {
  brand: string;
  href: string;
  imageUrl?: string;
  priceLabel: string;
  specsLabel: string;
  tags: string[];
  title: string;
};

export type HomePageViewModel = {
  ads: HomeAdCard[];
  bodies: HomeBodyTile[];
  brands: HomeBrandTile[];
};
