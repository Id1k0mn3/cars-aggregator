import { apiRequestWithMeta } from "@/src/shared/api";

import { mapVehicleDtoToVehicle } from "../model/mappers";
import type { Vehicle, VehicleDto } from "../model/types";
import type { VehicleFilterParams } from "../model/vehicle-filters";

type VehicleListResult = {
  items: Vehicle[];
  total: number | null;
};

const parseContentRangeTotal = (contentRange: string | null) => {
  if (contentRange === null) {
    return null;
  }

  const match = contentRange.match(/\/(\d+)$/);

  if (match === null) {
    return null;
  }

  const total = Number.parseInt(match[1], 10);

  return Number.isFinite(total) ? total : null;
};

const createVehicleSearchParams = (params: VehicleFilterParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};

export const getVehicles = async (params: VehicleFilterParams): Promise<VehicleListResult> => {
  const searchParams = createVehicleSearchParams(params);
  const queryString = searchParams.toString();
  const path = queryString ? `/vehicles/?${queryString}` : "/vehicles/";
  const response = await apiRequestWithMeta<VehicleDto[]>(path, {
    cache: "no-store",
  });

  return {
    items: response.data.map(mapVehicleDtoToVehicle),
    total: parseContentRangeTotal(response.headers.get("content-range")),
  };
};
