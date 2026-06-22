export type VehicleFilterParams = {
  body_type_id?: number;
  brand_type_id?: number;
  first_registration_from?: string;
  first_registration_to?: string;
  fuel_type_id?: number;
  page?: number;
  per_page?: number;
  price_from?: number;
  price_to?: number;
};

export const DEFAULT_VEHICLE_PER_PAGE = 20;

export const vehicleFilterParamKeys = [
  "brand_type_id",
  "fuel_type_id",
  "body_type_id",
  "price_from",
  "price_to",
  "first_registration_from",
  "first_registration_to",
  "page",
  "per_page",
] as const;

export type VehicleFilterParamKey = (typeof vehicleFilterParamKeys)[number];
