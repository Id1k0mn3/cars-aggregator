import type { VehicleType } from "@/src/entities/dictionary";
import type { VehicleFilterParamKey, VehicleFilterParams } from "@/src/entities/vehicle";
import { vehicleFilterParamKeys } from "@/src/entities/vehicle";

type SearchParamsInput = Record<string, string | string[] | undefined>;

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

const filterKeys = [
  "brand_type_id",
  "fuel_type_id",
  "body_type_id",
  "price_from",
  "price_to",
  "first_registration_from",
  "first_registration_to",
] as const;

type SupportedFilterKey = VehicleFilterParamKey;
type DraftFilterKey = keyof VehicleFilterDraft;

const getSingleParam = (searchParams: SearchParamsInput, key: SupportedFilterKey) => {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

const isDateString = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const parsePositiveInteger = (value: string) => {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isSafeInteger(parsed) ? parsed : null;
};

const parseNonNegativeNumber = (value: string) => {
  if (!/^\d+(\.\d+)?$/.test(value)) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

export const parseVehicleFilterSearchParams = (
  searchParams: SearchParamsInput,
): VehicleFilterParseResult => {
  const filters: VehicleFilterParams = {};
  const validationMessages: string[] = [];

  (["brand_type_id", "fuel_type_id", "body_type_id"] as const).forEach((key) => {
    const value = getSingleParam(searchParams, key);

    if (!value) {
      return;
    }

    const parsed = parsePositiveInteger(value);

    if (parsed === null || parsed < 1) {
      validationMessages.push(`${key} must be a positive number.`);
      return;
    }

    filters[key] = parsed;
  });

  (["price_from", "price_to"] as const).forEach((key) => {
    const value = getSingleParam(searchParams, key);

    if (!value) {
      return;
    }

    const parsed = parseNonNegativeNumber(value);

    if (parsed === null) {
      validationMessages.push(`${key} must be 0 or greater.`);
      return;
    }

    filters[key] = parsed;
  });

  if (
    filters.price_from !== undefined &&
    filters.price_to !== undefined &&
    filters.price_to < filters.price_from
  ) {
    validationMessages.push("Price to must be greater than or equal to price from.");
    delete filters.price_from;
    delete filters.price_to;
  }

  (["first_registration_from", "first_registration_to"] as const).forEach((key) => {
    const value = getSingleParam(searchParams, key);

    if (!value) {
      return;
    }

    if (!isDateString(value)) {
      validationMessages.push(`${key} must use YYYY-MM-DD format.`);
      return;
    }

    filters[key] = value;
  });

  if (
    filters.first_registration_from !== undefined &&
    filters.first_registration_to !== undefined &&
    filters.first_registration_to < filters.first_registration_from
  ) {
    validationMessages.push("Registration to must be after registration from.");
    delete filters.first_registration_from;
    delete filters.first_registration_to;
  }

  const page = getSingleParam(searchParams, "page");

  if (page) {
    const parsed = parsePositiveInteger(page);

    if (parsed === null || parsed < 1) {
      validationMessages.push("Page must be 1 or greater.");
    } else {
      filters.page = parsed;
    }
  }

  const perPage = getSingleParam(searchParams, "per_page");

  if (perPage) {
    const parsed = parsePositiveInteger(perPage);

    if (parsed === null || parsed < 1 || parsed > 100) {
      validationMessages.push("Per page must be between 1 and 100.");
    } else {
      filters.per_page = parsed;
    }
  }

  return {
    filters,
    validationMessages,
  };
};

export const createDraftFromFilters = (filters: VehicleFilterParams): VehicleFilterDraft => {
  return {
    body_type_id: filters.body_type_id?.toString() ?? "",
    brand_type_id: filters.brand_type_id?.toString() ?? "",
    first_registration_from: filters.first_registration_from ?? "",
    first_registration_to: filters.first_registration_to ?? "",
    fuel_type_id: filters.fuel_type_id?.toString() ?? "",
    price_from: filters.price_from?.toString() ?? "",
    price_to: filters.price_to?.toString() ?? "",
  };
};

export const parseVehicleFilterDraft = (
  draft: VehicleFilterDraft,
  currentFilters: VehicleFilterParams,
): VehicleFilterParseResult => {
  return parseVehicleFilterSearchParams({
    ...draft,
    page: "1",
    per_page: currentFilters.per_page?.toString(),
  });
};

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

  filterKeys.forEach((key) => {
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
