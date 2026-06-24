import {
  formatVehicleMileage,
  formatVehiclePrice,
  formatVehicleYear,
} from "@/src/entities/vehicle";
import { resolveImageUrl } from "@/src/shared/lib/resolve-image-url";

import type { HomePageDto, HomeVehicleDto } from "../api/home-page-api";
import {
  createHomeQuickFilters,
  EMPTY_FEED_SUMMARY,
  homeFooterColumns,
  homeTrustItems,
  LIVE_FEED_SUMMARY,
} from "./home-page-content";
import { createListingsHref } from "./home-page-links";
import type {
  HomeCategoryItem,
  HomePageData,
  HomeSearchOption,
  HomeVehicleCard,
} from "./home-page-types";

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

// TODO: обсудить с яриком только возвращение данных, которые присутсвуют. сейчас возвращаются в алфавитном порядке.
const mapDictionaryItemsToCategoryItems = (
  items: HomePageDto["brands"],
  queryKey: "brand_type_id" | "body_type_id",
) => {
  return items.map((item) => mapHomeDictionaryItemToTile(item, queryKey));
  // .filter((item) => item.countLabel > 0);
};

const mapVehicleToAdCard = (vehicle: HomeVehicleDto): HomeVehicleCard => {
  const brand = vehicle.general.brandType?.title ?? "Vehicle";
  const bodyType = vehicle.general.bodyType?.title;
  const fuelType = vehicle.general.fuelType?.title;
  const gearboxType = vehicle.general.gearboxType;
  const firstRegistration = formatVehicleYear(vehicle.general.firstRegistration);
  const mileage = formatVehicleMileage(vehicle.general.mileage);
  const specParts = [firstRegistration, mileage, fuelType, gearboxType].filter(
    (part): part is string => typeof part === "string" && part.length > 0,
  );

  return {
    brand,
    href: `/vehicles/${vehicle.id}`,
    imageUrl: resolveImageUrl(vehicle.images[0]),
    priceLabel: formatVehiclePrice(vehicle.general.price),
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

const mapDictionaryItemsToSearchOptions = (items: HomePageDto["brands"]): HomeSearchOption[] => {
  return createUniqueOptions(
    items.map((item) => ({
      label: item.title,
      value: item.id.toString(),
    })),
  );
};

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
    footerColumns: homeFooterColumns,
    hero: {
      searchOptions: {
        bodyTypes: [],
        carBrands: [],
      },
      stats: createHeroStats(baseData),
      summary: EMPTY_FEED_SUMMARY,
    },
    quickFilters: createHomeQuickFilters(),
    trustItems: homeTrustItems,
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
    footerColumns: homeFooterColumns,
    hero: {
      searchOptions: {
        bodyTypes: mapDictionaryItemsToSearchOptions(dto.bodies),
        carBrands: mapDictionaryItemsToSearchOptions(dto.brands),
      },
      stats: createHeroStats(baseData),
      summary: LIVE_FEED_SUMMARY,
    },
    quickFilters: createHomeQuickFilters(),
    trustItems: homeTrustItems,
  };
};
