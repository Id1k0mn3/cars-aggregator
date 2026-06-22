import Link from "next/link";

import type { FeaturedCar } from "../model/mock-home-data";

type FeaturedVehiclesSectionProps = {
  featuredCars: FeaturedCar[];
};

const badgeToneClasses: Record<NonNullable<FeaturedCar["badge"]>["tone"], string> = {
  blue: "bg-blue-600",
  green: "bg-emerald-600",
  orange: "bg-orange-600",
};

export function FeaturedVehiclesSection({ featuredCars }: FeaturedVehiclesSectionProps) {
  return (
    <>
      <SectionHeader href="/products" title="Fresh listings" />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {featuredCars.map((car) => (
          <article
            className="overflow-hidden rounded-[14px] border border-slate-200 bg-white"
            key={`${car.brand}-${car.name}`}
          >
            <div
              className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${car.gradient}`}
            >
              {car.badge ? (
                <span
                  className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${badgeToneClasses[car.badge.tone]}`}
                >
                  {car.badge.label}
                </span>
              ) : null}
              <button
                aria-label={`Save ${car.name}`}
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-sm text-slate-500"
                type="button"
              >
                Save
              </button>
              <span className="rounded-md bg-white/20 px-3 py-2 text-sm font-semibold text-white/75">
                {car.brand}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {car.brand}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-950">{car.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{car.specs}</p>
              <p className="mt-3 text-xl font-bold text-slate-950">{car.price}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {car.tags.map((tag) => (
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500" key={tag}>
                    {tag}
                  </span>
                ))}
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  {car.location}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

type SectionHeaderProps = {
  href?: string;
  title: string;
};

function SectionHeader({ href, title }: SectionHeaderProps) {
  return (
    <section className="mx-auto mt-9 flex w-full max-w-7xl items-baseline justify-between px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      {href ? (
        <Link className="text-sm font-medium text-blue-600" href={href}>
          View all
        </Link>
      ) : null}
    </section>
  );
}
