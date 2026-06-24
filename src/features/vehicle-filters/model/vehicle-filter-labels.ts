import type { VehicleType } from "@/src/entities/dictionary";
import type { VehicleFilterParamKey, VehicleFilterParams } from "@/src/entities/vehicle";

import type { DraftFilterKey, VehicleFilterDictionaries } from "./vehicle-filter-types";

const labelFilterKeys = [
  "brand_type_id",
  "fuel_type_id",
  "body_type_id",
  "price_from",
  "price_to",
  "first_registration_from",
  "first_registration_to",
] as const satisfies readonly VehicleFilterParamKey[];

const findTitle = (items: VehicleType[], id: number | undefined, fallback: string) => {
  if (id === undefined) {
    return null;
  }

  return items.find((item) => item.id === id)?.title ?? `${fallback} #${id}`;
};

export const getSelectedVehicleFilterLabels = (
  filters: VehicleFilterParams,
  dictionaries: VehicleFilterDictionaries,
) => {
  const labels: Array<{ key: DraftFilterKey; label: string }> = [];
  const brandTitle = findTitle(dictionaries.brandTypes, filters.brand_type_id, "Brand");
  const fuelTitle = findTitle(dictionaries.fuelTypes, filters.fuel_type_id, "Fuel");
  const bodyTitle = findTitle(dictionaries.bodyTypes, filters.body_type_id, "Body");

  if (brandTitle !== null) {
    labels.push({ key: "brand_type_id", label: brandTitle });
  }

  if (fuelTitle !== null) {
    labels.push({ key: "fuel_type_id", label: fuelTitle });
  }

  if (bodyTitle !== null) {
    labels.push({ key: "body_type_id", label: bodyTitle });
  }

  labelFilterKeys.forEach((key) => {
    if (key === "brand_type_id" || key === "fuel_type_id" || key === "body_type_id") {
      return;
    }

    const value = filters[key];

    if (value !== undefined) {
      labels.push({ key, label: `${key.replaceAll("_", " ")}: ${value}` });
    }
  });

  return labels;
};
