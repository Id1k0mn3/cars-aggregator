import { resolveImageUrl } from "@/src/shared/lib/resolve-image-url";

import type { HomePageDto, HomeVehicleDto } from "../api/home-page-api";
import type {
  HomeCategoryItem,
  HomeFooterColumn,
  HomeLinkItem,
  HomePageData,
  HomeSearchOption,
  HomeTrustItem,
  HomeVehicleCard,
} from "./home-page-types";

const EMPTY_FEED_SUMMARY = "Home feed unavailable. Safe empty sections are shown below.";
const LIVE_FEED_SUMMARY = "Live car brands, body types, and ads from the current home feed.";

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

const formatNumber = (value: number | null) => {
  return value === null ? "N/A" : new Intl.NumberFormat("en-US").format(value);
};

const formatPriceLabel = (value: number | null) => {
  return value === null
    ? "Price on request"
    : `${new Intl.NumberFormat("en-US").format(value)} EUR`;
};

const createListingsHref = (query: Record<string, number | string> = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  return `/vehicles?${searchParams.toString()}`;
};

const mapHomeDictionaryItemToTile = (
  item: HomePageDto["brands"][number],
  queryKey: "brand_type_id" | "body_type_id",
): HomeCategoryItem => {
  return {
    countLabel: item.total || 0,
    href: createListingsHref({ [queryKey]: item.id }),
    label: item.title,
  };
};

const mapDictionaryItemsToCategoryItems = (
  items: HomePageDto["brands"],
  queryKey: "brand_type_id" | "body_type_id",
) => {
  return items
    .map((item) => mapHomeDictionaryItemToTile(item, queryKey))
    .filter((item) => item.countLabel > 0);
};

const mapVehicleToAdCard = (vehicle: HomeVehicleDto): HomeVehicleCard => {
  const brand = vehicle.general.brandType?.title ?? "Vehicle";
  const bodyType = vehicle.general.bodyType?.title;
  const fuelType = vehicle.general.fuelType?.title;
  const gearboxType = vehicle.general.gearboxType;
  const firstRegistration = vehicle.general.firstRegistration?.slice(0, 4) ?? "Year N/A";
  const mileage = `${formatNumber(vehicle.general.mileage)} km`;
  const specParts = [firstRegistration, mileage, fuelType, gearboxType].filter(
    (part): part is string => typeof part === "string" && part.length > 0,
  );

  return {
    brand,
    href: `/vehicles/${vehicle.id}`,
    imageUrl: resolveImageUrl(vehicle.images[0]),
    priceLabel: formatPriceLabel(vehicle.general.price),
    specsLabel: specParts.join(" · "),
    tags: [bodyType, fuelType].filter(
      (tag): tag is string => typeof tag === "string" && tag.length > 0,
    ),
    title: vehicle.title,
  };
};

const createUniqueOptions = (options: HomeSearchOption[]) => {
  const seen = new Set<string>();

  return options.filter((option) => {
    const key = option.value.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const mapVehiclesToCarBrandOptions = (vehicles: HomeVehicleDto[]): HomeSearchOption[] => {
  return createUniqueOptions(
    vehicles
      .map((vehicle) => vehicle.general.brandType)
      .filter((brandType): brandType is NonNullable<HomeVehicleDto["general"]["brandType"]> =>
        Boolean(brandType),
      )
      .map((brandType) => ({
        label: brandType.title,
        value: brandType.id.toString(),
      })),
  );
};

const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const extractModelTitle = (vehicle: HomeVehicleDto) => {
  const brandTitle = vehicle.general.brandType?.title;

  if (!brandTitle) {
    return vehicle.title;
  }

  const modelTitle = vehicle.title
    .replace(new RegExp(`^${escapeRegExp(brandTitle)}\\s+`, "i"), "")
    .trim();

  return modelTitle || vehicle.title;
};

const mapHomePageDtoToModelOptions = (dto: HomePageDto): HomeSearchOption[] => {
  if (Array.isArray(dto.models) && dto.models.length > 0) {
    return createUniqueOptions(
      dto.models.map((model) => ({
        label: model.title,
        value: model.id?.toString() ?? model.slug ?? model.title,
      })),
    );
  }

  return createUniqueOptions(
    dto.vehicles.map((vehicle) => {
      const title = extractModelTitle(vehicle);

      return {
        label: title,
        value: title,
      };
    }),
  );
};

const createQuickFilters = (): HomeLinkItem[] => [
  { href: createListingsHref(), label: "All cars" },
  { href: createListingsHref({ price_to: 10000 }), label: "Under 10,000 EUR" },
  { href: createListingsHref({ fuel_type_id: 3 }), label: "Electric" },
  { href: createListingsHref({ fuel_type_id: 2 }), label: "Hybrid" },
  { href: createListingsHref({ body_type_id: 3 }), label: "Hatchback" },
  { href: createListingsHref({ body_type_id: 2 }), label: "SUV / Crossover" },
  { href: createListingsHref({ fuel_type_id: 1 }), label: "Diesel" },
  { label: "Automatic" },
  { label: "One owner" },
];

const createHeroStats = (
  homePage: Pick<HomePageData, "bodyTypes" | "carBrands" | "featuredVehicles">,
) => [
  { label: "Car brands", value: new Intl.NumberFormat("en-US").format(homePage.carBrands.length) },
  { label: "Body types", value: new Intl.NumberFormat("en-US").format(homePage.bodyTypes.length) },
  { label: "Ads", value: new Intl.NumberFormat("en-US").format(homePage.featuredVehicles.length) },
  { label: "Live feed", value: homePage.featuredVehicles.length > 0 ? "Ready" : "Empty" },
];

export const createEmptyHomePageData = (): HomePageData => {
  const baseData = {
    bodyTypes: [],
    carBrands: [],
    featuredVehicles: [],
  };

  return {
    ...baseData,
    footerColumns,
    hero: {
      searchOptions: {
        carBrands: [],
        models: [],
      },
      stats: createHeroStats(baseData),
      summary: EMPTY_FEED_SUMMARY,
    },
    quickFilters: createQuickFilters(),
    trustItems,
  };
};

export const mapHomePageDtoToData = (dto: HomePageDto): HomePageData => {
  const bodyTypes = mapDictionaryItemsToCategoryItems(dto.bodies, "body_type_id");
  const carBrands = mapDictionaryItemsToCategoryItems(dto.brands, "brand_type_id");
  const featuredVehicles = dto.vehicles.map(mapVehicleToAdCard);
  const baseData = {
    bodyTypes,
    carBrands,
    featuredVehicles,
  };

  return {
    ...baseData,
    footerColumns,
    hero: {
      searchOptions: {
        carBrands: mapVehiclesToCarBrandOptions(dto.vehicles),
        models: mapHomePageDtoToModelOptions(dto),
      },
      stats: createHeroStats(baseData),
      summary: LIVE_FEED_SUMMARY,
    },
    quickFilters: createQuickFilters(),
    trustItems,
  };
};
