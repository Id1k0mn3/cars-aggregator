import Link from "next/link";

export type VehicleCardViewModel = {
  brand: string;
  fuel: string;
  href: string;
  id: string;
  location: string;
  mileage: string;
  price: string;
  title: string;
  year: string;
};

type VehicleCardProps = {
  product: VehicleCardViewModel;
};

export function VehicleCard({ product }: VehicleCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Link
        aria-label={`Open ${product.title}`}
        className="block h-36 bg-gradient-to-br from-blue-950 via-blue-700 to-sky-500"
        href={product.href}
      />
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.brand}
        </p>
        <Link
          className="mt-1 block text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700"
          href={product.href}
        >
          {product.title}
        </Link>
        <p className="mt-2 text-xs text-slate-500">
          {product.year} · {product.mileage} · {product.fuel}
        </p>
        <p className="mt-3 text-lg font-bold text-slate-950">{product.price}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            {product.location}
          </span>
        </div>
      </div>
    </article>
  );
}
