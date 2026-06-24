"use client";

import { useState } from "react";

import { VehicleCard, type VehicleCardViewModel } from "@/src/entities/vehicle";

import type { VehicleDetailSpec } from "../model/vehicle-detail-types";

type VehicleDetailTabsProps = {
  description: string;
  similarVehicles: VehicleCardViewModel[];
  sourceUrl: string;
  specs: VehicleDetailSpec[];
};

type VehicleDetailTab = "equipment" | "history" | "similar" | "specs";

const tabs: Array<{ id: VehicleDetailTab; label: string }> = [
  { id: "specs", label: "Specs" },
  { id: "equipment", label: "Equipment" },
  { id: "history", label: "History" },
  { id: "similar", label: "Similar cars" },
];

export function VehicleDetailTabs({
  description,
  similarVehicles,
  sourceUrl,
  specs,
}: VehicleDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<VehicleDetailTab>("specs");

  return (
    <section className="mt-6">
      <div className="flex gap-5 overflow-x-auto border-b border-slate-200 text-sm">
        {tabs.map((tab) => (
          <button
            className={
              activeTab === tab.id
                ? "border-b-2 border-blue-600 pb-3 font-semibold text-blue-700"
                : "pb-3 text-slate-500 transition-colors hover:text-blue-700"
            }
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "specs" ? <SpecsTab specs={specs} /> : null}
      {activeTab === "equipment" ? <EquipmentTab specs={specs} /> : null}
      {activeTab === "history" ? (
        <HistoryTab description={description} sourceUrl={sourceUrl} />
      ) : null}
      {activeTab === "similar" ? <SimilarVehiclesTab vehicles={similarVehicles} /> : null}
    </section>
  );
}

type SpecsTabProps = {
  specs: VehicleDetailSpec[];
};

function SpecsTab({ specs }: SpecsTabProps) {
  return (
    <div className="mt-5 grid overflow-hidden rounded-xl border border-slate-200 sm:grid-cols-2">
      {specs.map((spec) => (
        <div className="grid grid-cols-2 border-b border-slate-200" key={spec.label}>
          <div className="bg-slate-50 px-4 py-3 text-sm text-slate-500">{spec.label}</div>
          <div className="bg-white px-4 py-3 text-sm font-semibold">{spec.value}</div>
        </div>
      ))}
    </div>
  );
}

function EquipmentTab({ specs }: SpecsTabProps) {
  const equipmentItems = specs.filter((spec) => spec.isAvailable);

  if (equipmentItems.length === 0) {
    return (
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-500">
        Equipment details are not available for this listing yet.
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {equipmentItems.map((item) => (
        <div
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
          key={item.label}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {item.label}
          </p>
          <p className="mt-1 font-semibold text-slate-950">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

type HistoryTabProps = {
  description: string;
  sourceUrl: string;
};

function HistoryTab({ description, sourceUrl }: HistoryTabProps) {
  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">
      <p>{description}</p>
      <a
        className="mt-4 inline-flex font-semibold text-blue-700"
        href={sourceUrl}
        rel="noreferrer"
        target="_blank"
      >
        Open original listing
      </a>
    </div>
  );
}

type SimilarVehiclesTabProps = {
  vehicles: VehicleCardViewModel[];
};

function SimilarVehiclesTab({ vehicles }: SimilarVehiclesTabProps) {
  if (vehicles.length === 0) {
    return (
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-500">
        Similar listings are unavailable right now.
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
