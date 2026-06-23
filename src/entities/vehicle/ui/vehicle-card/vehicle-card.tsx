import Image from "next/image";
import Link from "next/link";

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
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Link aria-label={`Open ${vehicle.title}`} className="block" href={vehicle.href}>
        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-sky-500">
          {vehicle.imageUrl ? (
            <Image
              alt={vehicle.title}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              src={vehicle.imageUrl}
              unoptimized
            />
          ) : null}
        </div>
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
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            {vehicle.location}
          </span>
        </div>
      </div>
    </article>
  );
}
