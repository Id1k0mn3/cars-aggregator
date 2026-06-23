import { resolveImageUrl } from "@/src/shared/lib/resolve-image-url";

import type { HomePageDto, HomeVehicleDto } from "../api/home-page-api";
import type { HomeAdCard, HomeBodyTile, HomeBrandTile, HomePageViewModel } from "./home-page-types";

const formatNumber = (value: number | null) => {
  return value === null ? "N/A" : new Intl.NumberFormat("en-US").format(value);
};

const formatPriceLabel = (value: number | null) => {
  return value === null
    ? "Price on request"
    : `${new Intl.NumberFormat("en-US").format(value)} EUR`;
};

const createListingsHref = (query: Record<string, number>) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  return `/vehicles?${searchParams.toString()}`;
};

const mapHomeDictionaryItemToTile = (
  item: HomePageDto["brands"][number],
  queryKey: "brand_type_id" | "body_type_id",
): HomeBrandTile | HomeBodyTile => {
  return {
    countLabel: item.total || 0,
    href: createListingsHref({ [queryKey]: item.id }),
    label: item.title,
  };
};

const mapVehicleToAdCard = (vehicle: HomeVehicleDto): HomeAdCard => {
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

export const createEmptyHomePageViewModel = (): HomePageViewModel => {
  return {
    ads: [],
    bodies: [],
    brands: [],
  };
};

export const mapHomePageDtoToViewModel = (dto: HomePageDto): HomePageViewModel => {
  return {
    ads: dto.vehicles.length ? dto.vehicles.map(mapVehicleToAdCard) : [],
    bodies: dto.bodies.length
      ? dto.bodies.map((item) => mapHomeDictionaryItemToTile(item, "body_type_id"))
      : [],
    brands: dto.brands.length
      ? dto.brands.map((item) => mapHomeDictionaryItemToTile(item, "brand_type_id"))
      : [],
  };
};
