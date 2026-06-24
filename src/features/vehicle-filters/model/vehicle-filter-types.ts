import type { VehicleType } from "@/src/entities/dictionary";
import type { VehicleFilterParams } from "@/src/entities/vehicle";

export type SearchParamsInput = Record<string, string | string[] | undefined>;

export type VehicleFilterDraft = {
  body_type_id: string;
  brand_type_id: string;
  first_registration_from: string;
  first_registration_to: string;
  fuel_type_id: string;
  price_from: string;
  price_to: string;
};

export type VehicleFilterDictionaries = {
  bodyTypes: VehicleType[];
  brandTypes: VehicleType[];
  fuelTypes: VehicleType[];
};

export type VehicleFilterParseResult = {
  filters: VehicleFilterParams;
  validationMessages: string[];
};

export type DraftFilterKey = keyof VehicleFilterDraft;
