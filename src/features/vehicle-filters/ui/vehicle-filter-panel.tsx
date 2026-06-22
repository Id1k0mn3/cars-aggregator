"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import type { VehicleFilterParams } from "@/src/entities/vehicle";

import type { VehicleFilterDictionaries, VehicleFilterDraft } from "../model/vehicle-filter-query";
import {
  clearVehicleFilterParams,
  createDraftFromFilters,
  parseVehicleFilterDraft,
  serializeVehicleFilterParams,
} from "../model/vehicle-filter-query";

type VehicleFilterPanelProps = {
  currentFilters: VehicleFilterParams;
  dictionaries: VehicleFilterDictionaries;
  validationMessages: string[];
};

export function VehicleFilterPanel({
  currentFilters,
  dictionaries,
  validationMessages,
}: VehicleFilterPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [draft, setDraft] = useState<VehicleFilterDraft>(() =>
    createDraftFromFilters(currentFilters),
  );
  const [localValidationMessages, setLocalValidationMessages] = useState<string[]>([]);

  const updateDraft = (key: keyof VehicleFilterDraft, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const result = parseVehicleFilterDraft(draft, currentFilters);

    if (result.validationMessages.length > 0) {
      setLocalValidationMessages(result.validationMessages);
      return;
    }

    const queryString = serializeVehicleFilterParams(result.filters).toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const resetFilters = () => {
    const nextParams = serializeVehicleFilterParams(clearVehicleFilterParams(currentFilters));
    const queryString = nextParams.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const messages = [...validationMessages, ...localValidationMessages];

  return (
    <aside className="self-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="border-b border-slate-200 pb-4 text-base font-bold">Filters</h2>

      {messages.length > 0 ? (
        <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-5">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Brand
          </span>
          <select
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            onChange={(event) => updateDraft("brand_type_id", event.target.value)}
            value={draft.brand_type_id}
          >
            <option value="">All brands</option>
            {dictionaries.brandTypes.map((brandType) => (
              <option key={brandType.id} value={brandType.id}>
                {brandType.title}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Body</span>
          <select
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            onChange={(event) => updateDraft("body_type_id", event.target.value)}
            value={draft.body_type_id}
          >
            <option value="">All body types</option>
            {dictionaries.bodyTypes.map((bodyType) => (
              <option key={bodyType.id} value={bodyType.id}>
                {bodyType.title}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="grid gap-2">
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Price (EUR)
          </legend>
          <span className="grid grid-cols-2 gap-2">
            <input
              className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              min="0"
              onChange={(event) => updateDraft("price_from", event.target.value)}
              placeholder="from"
              type="number"
              value={draft.price_from}
            />
            <input
              className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              min="0"
              onChange={(event) => updateDraft("price_to", event.target.value)}
              placeholder="to"
              type="number"
              value={draft.price_to}
            />
          </span>
        </fieldset>

        <fieldset className="grid gap-2">
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            First registration
          </legend>
          <span className="grid grid-cols-2 gap-2">
            <input
              className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              onChange={(event) => updateDraft("first_registration_from", event.target.value)}
              type="date"
              value={draft.first_registration_from}
            />
            <input
              className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              onChange={(event) => updateDraft("first_registration_to", event.target.value)}
              type="date"
              value={draft.first_registration_to}
            />
          </span>
        </fieldset>

        <fieldset className="grid gap-2">
          <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Fuel
          </legend>
          <select
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            onChange={(event) => updateDraft("fuel_type_id", event.target.value)}
            value={draft.fuel_type_id}
          >
            <option value="">All fuel types</option>
            {dictionaries.fuelTypes.map((fuelType) => (
              <option key={fuelType.id} value={fuelType.id}>
                {fuelType.title}
              </option>
            ))}
          </select>
        </fieldset>

        <button
          className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
          onClick={applyFilters}
          type="button"
        >
          Apply filters
        </button>
        <button className="text-sm font-medium text-blue-700" onClick={resetFilters} type="button">
          Reset all
        </button>
      </div>
    </aside>
  );
}
