import Image from "next/image";
import Link from "next/link";

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
  return (
    <article className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:grid-cols-[220px_1fr_170px]">
      <Link
        aria-label={`Open ${vehicle.title}`}
        className="relative min-h-48 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-sky-400 md:min-h-full"
        href={vehicle.href}
      >
        {vehicle.imageUrl ? (
          <Image
            alt={vehicle.title}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 220px, 100vw"
            src={vehicle.imageUrl}
            unoptimized
          />
        ) : null}
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
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
              key={feature}
            >
              {feature}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {vehicle.location} · {vehicle.postedAt} · {vehicle.views} views
        </p>
      </div>

      <div className="flex flex-col justify-between gap-5 border-t border-slate-200 p-5 md:items-end md:border-l md:border-t-0">
        <div className="md:text-right">
          <p className="text-2xl font-bold text-slate-950">{vehicle.price}</p>
          <p className="text-xs text-slate-500">{vehicle.priceNote}</p>
        </div>
        <div className="grid w-full gap-2">
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Show phone
          </button>
          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </article>
  );
}
