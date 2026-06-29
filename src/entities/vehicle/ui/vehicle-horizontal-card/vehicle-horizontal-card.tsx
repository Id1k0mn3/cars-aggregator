import Link from "next/link";

import { EyeIcon, HeartIcon, MapPinIcon, PhoneIcon } from "../vehicle-icons";
import { VehicleImageFrame } from "../vehicle-image";

export type VehicleHorizontalCardViewModel = {
  badge?: string;
  brand: string;
  features: string[];
  fuel: string;
  href: string;
  id: string;
  imageUrl?: string;
  location: string;
  mileage: string;
  postedAt: string;
  power: string;
  price: string;
  priceNote: string;
  title: string;
  transmission: string;
  views: string;
  year: string;
};

type VehicleHorizontalCardProps = {
  vehicle: VehicleHorizontalCardViewModel;
};

export function VehicleHorizontalCard({ vehicle }: VehicleHorizontalCardProps) {
  console.log(vehicle.imageUrl);
  return (
    <article className="group grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md md:grid-cols-[220px_1fr_170px]">
      <Link
        aria-label={`Open ${vehicle.title}`}
        className="group/image relative min-h-48 overflow-hidden bg-slate-100 md:min-h-full"
        href={vehicle.href}
      >
        <VehicleImageFrame
          className="absolute inset-0"
          eyebrow={vehicle.brand}
          imageUrl={vehicle.imageUrl}
          sizes="(min-width: 768px) 220px, 100vw"
          title={vehicle.title}
        />
        {vehicle.badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {vehicle.badge}
          </span>
        ) : null}
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {vehicle.brand}
        </p>
        <Link
          className="mt-1 block text-lg font-bold text-slate-950 transition-colors hover:text-blue-700"
          href={vehicle.href}
        >
          {vehicle.title}
        </Link>
        <p className="mt-2 text-sm text-slate-500">
          {vehicle.year} · {vehicle.mileage} · {vehicle.fuel} · {vehicle.transmission} ·{" "}
          {vehicle.power}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {vehicle.features.map((feature) => (
            <span
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
              key={feature}
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-3.5" />
            {vehicle.location}
          </span>
          <span>{vehicle.postedAt}</span>
          <span className="inline-flex items-center gap-1.5">
            <EyeIcon className="size-3.5" />
            {vehicle.views} views
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 border-t border-slate-200 p-5 md:items-end md:border-l md:border-t-0">
        <div className="md:text-right">
          <p className="text-2xl font-bold text-slate-950">{vehicle.price}</p>
          <p className="text-xs text-slate-500">{vehicle.priceNote}</p>
        </div>
        <div className="grid w-full gap-2">
          <button
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-500"
            disabled
            title="Seller phone is not available yet"
            type="button"
          >
            <PhoneIcon />
            Show phone
          </button>
          <button
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400"
            disabled
            title="Saved listings are not available yet"
            type="button"
          >
            <HeartIcon />
            Save
          </button>
        </div>
      </div>
    </article>
  );
}
