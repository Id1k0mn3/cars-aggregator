import { apiRequest } from "@/src/shared/api";

import type { VehicleType, VehicleTypeDto } from "../model/types";

const getVehicleDictionary = async (path: string): Promise<VehicleType[]> => {
  const dictionary = await apiRequest<VehicleTypeDto[]>(path);

  return dictionary;
};

export const getBrandTypes = () => {
  return getVehicleDictionary("/dictionaries/vehicles/brand-types");
};

export const getFuelTypes = () => {
  return getVehicleDictionary("/dictionaries/vehicles/fuel-types");
};

export const getBodyTypes = () => {
  return getVehicleDictionary("/dictionaries/vehicles/body-types");
};
