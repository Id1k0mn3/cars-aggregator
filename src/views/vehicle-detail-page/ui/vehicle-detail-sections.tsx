import Link from "next/link";

import type { VehicleDetailViewModel } from "../model/vehicle-detail-mappers";

type VehicleDetailComponentProps = {
  vehicle: VehicleDetailViewModel;
};

export function VehicleDetailBreadcrumb({ vehicle }: VehicleDetailComponentProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
      <Link className="font-medium text-blue-700" href="/vehicles">
        Back to results
      </Link>
      <span>|</span>
      <span>
        Home / {vehicle.bodyType} / {vehicle.brand}
      </span>
    </div>
  );
}

export function VehicleDetailHeader({ vehicle }: VehicleDetailComponentProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{vehicle.title}</h1>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
          <span>{vehicle.year}</span>
          <span>{vehicle.mileage}</span>
          <span>{vehicle.location}</span>
          <span>Ad #{vehicle.adId}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
          New listing
        </span>
        <button
          className="cursor-not-allowed text-slate-400"
          disabled
          title="Sharing is not available yet"
          type="button"
        >
          Share
        </button>
        <button
          className="cursor-not-allowed text-slate-400"
          disabled
          title="Reports are not available yet"
          type="button"
        >
          Report
        </button>
      </div>
    </section>
  );
}

export function VehicleStatsStrip({ vehicle }: VehicleDetailComponentProps) {
  const items = [
    { label: "Mileage", value: vehicle.mileage },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Power", value: vehicle.power },
    { label: "Drive", value: vehicle.drive },
  ];

  return (
    <div className="mt-5 grid overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-5">
      {items.map((item) => (
        <div className="bg-white p-4 text-center" key={item.label}>
          <p className="text-xs text-slate-500">{item.label}</p>
          <p className="mt-1 font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export function VehiclePricePanel({ vehicle }: VehicleDetailComponentProps) {
  return (
    <aside className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-3xl font-bold">{vehicle.price}</p>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          Fixed price
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{vehicle.priceNote}</p>
      <div className="mt-5 grid gap-3">
        <a
          className="rounded-lg bg-blue-600 px-4 py-3 text-center font-bold text-white"
          href={vehicle.sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          View original listing
        </a>
        <button
          className="cursor-not-allowed rounded-lg border-2 border-slate-200 px-4 py-3 font-semibold text-slate-400"
          disabled
          title="Saved listings are not available yet"
          type="button"
        >
          Save listing
        </button>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            AM
          </div>
          <div>
            <p className="font-semibold">Listing source</p>
            <p className="text-xs text-blue-700">External marketplace</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-slate-500">
          <p>Internal listing ID #{vehicle.id}</p>
          <p>Source ad #{vehicle.adId}</p>
          <p>
            {vehicle.location} · Added {vehicle.postedAt}
          </p>
        </div>
      </div>
    </aside>
  );
}
