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
  product: VehicleHorizontalCardViewModel;
};

export function VehicleHorizontalCard({ product }: VehicleHorizontalCardProps) {
  return (
    <article className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:grid-cols-[220px_1fr_170px]">
      <Link
        aria-label={`Open ${product.title}`}
        className="relative min-h-48 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-sky-400 md:min-h-full"
        href={product.href}
      >
        {product.imageUrl ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />
        ) : null}
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        ) : null}
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.brand}
        </p>
        <Link
          className="mt-1 block text-lg font-bold text-slate-950 transition-colors hover:text-blue-700"
          href={product.href}
        >
          {product.title}
        </Link>
        <p className="mt-2 text-sm text-slate-500">
          {product.year} · {product.mileage} · {product.fuel} · {product.transmission} ·{" "}
          {product.power}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <span
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500"
              key={feature}
            >
              {feature}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {product.location} · {product.postedAt} · {product.views} views
        </p>
      </div>

      <div className="flex flex-col justify-between gap-5 border-t border-slate-200 p-5 md:items-end md:border-l md:border-t-0">
        <div className="md:text-right">
          <p className="text-2xl font-bold text-slate-950">{product.price}</p>
          <p className="text-xs text-slate-500">{product.priceNote}</p>
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
