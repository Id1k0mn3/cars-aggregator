import type { VehicleFilterParamKey, VehicleFilterParams } from "@/src/entities/vehicle";

import type {
  SearchParamsInput,
  VehicleFilterDraft,
  VehicleFilterParseResult,
} from "./vehicle-filter-types";

const getSingleParam = (searchParams: SearchParamsInput, key: VehicleFilterParamKey) => {
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

const parseNonNegativeInteger = (value: string) => {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
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

    const parsed = parseNonNegativeInteger(value);

    if (parsed === null) {
      validationMessages.push(`${key} must be an integer 0 or greater.`);
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
