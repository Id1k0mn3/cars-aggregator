import type { VehicleFilterParams } from "@/src/entities/vehicle";
import { vehicleFilterParamKeys } from "@/src/entities/vehicle";

import type { DraftFilterKey } from "./vehicle-filter-types";

export const serializeVehicleFilterParams = (filters: VehicleFilterParams) => {
  const searchParams = new URLSearchParams();

  vehicleFilterParamKeys.forEach((key) => {
    const value = filters[key];

    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};

export const removeVehicleFilterParam = (
  filters: VehicleFilterParams,
  key: DraftFilterKey,
): VehicleFilterParams => {
  const nextFilters: VehicleFilterParams = {
    ...filters,
    page: 1,
  };

  delete nextFilters[key];

  return nextFilters;
};

export const clearVehicleFilterParams = (filters: VehicleFilterParams): VehicleFilterParams => {
  return filters.per_page === undefined
    ? {}
    : {
        per_page: filters.per_page,
      };
};
