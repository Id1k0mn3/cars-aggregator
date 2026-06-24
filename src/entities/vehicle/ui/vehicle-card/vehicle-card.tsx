import Link from "next/link";

import { MapPinIcon } from "../vehicle-icons";
import { VehicleImageFrame } from "../vehicle-image";

export type VehicleCardViewModel = {
  brand: string;
  fuel: string;
  href: string;
  id: string;
  imageUrl?: string;
  location: string;
  mileage: string;
  price: string;
  title: string;
  year: string;
};

type VehicleCardProps = {
  vehicle: VehicleCardViewModel;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <Link aria-label={`Open ${vehicle.title}`} className="block" href={vehicle.href}>
        <VehicleImageFrame
          className="h-36"
          eyebrow={vehicle.brand}
          imageUrl={vehicle.imageUrl}
          sizes="(min-width: 1024px) 25vw, 100vw"
          title={vehicle.title}
        />
      </Link>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {vehicle.brand}
        </p>
        <Link
          className="mt-1 block text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
          href={vehicle.href}
        >
          {vehicle.title}
        </Link>
        <p className="mt-2 text-xs text-slate-500">
          {vehicle.year} · {vehicle.mileage} · {vehicle.fuel}
        </p>
        <p className="mt-3 text-lg font-bold text-slate-950">{vehicle.price}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            <MapPinIcon className="size-3.5" />
            {vehicle.location}
          </span>
        </div>
      </div>
    </article>
  );
}
