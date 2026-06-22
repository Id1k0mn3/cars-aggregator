"use client";

import { usePathname, useRouter } from "next/navigation";

import type { VehicleFilterParams } from "@/src/entities/vehicle";

import type { VehicleFilterDictionaries } from "../model/vehicle-filter-query";
import {
  clearVehicleFilterParams,
  getSelectedVehicleFilterLabels,
  removeVehicleFilterParam,
  serializeVehicleFilterParams,
} from "../model/vehicle-filter-query";

type SelectedVehicleFiltersProps = {
  currentFilters: VehicleFilterParams;
  dictionaries: VehicleFilterDictionaries;
};

export function SelectedVehicleFilters({
  currentFilters,
  dictionaries,
}: SelectedVehicleFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const selectedFilters = getSelectedVehicleFilterLabels(currentFilters, dictionaries);

  const navigateWithFilters = (filters: VehicleFilterParams) => {
    const queryString = serializeVehicleFilterParams(filters).toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  if (selectedFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedFilters.map((filter) => (
        <button
          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
          key={filter.key}
          onClick={() => navigateWithFilters(removeVehicleFilterParam(currentFilters, filter.key))}
          type="button"
        >
          {filter.label} x
        </button>
      ))}
      <button
        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"
        onClick={() => navigateWithFilters(clearVehicleFilterParams(currentFilters))}
        type="button"
      >
        Clear all
      </button>
    </div>
  );
}
