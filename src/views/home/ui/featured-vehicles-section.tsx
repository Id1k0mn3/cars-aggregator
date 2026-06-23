import Image from "next/image";
import Link from "next/link";

import type { HomeAdCard } from "../model/home-page-types";

type FeaturedVehiclesSectionProps = {
  featuredCars: HomeAdCard[];
};

export function FeaturedVehiclesSection({ featuredCars }: FeaturedVehiclesSectionProps) {
  return (
    <>
      <SectionHeader href="/vehicles" title="Fresh ads" />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {featuredCars.length > 0 ? (
          featuredCars.map((car) => (
            <article
              className="overflow-hidden rounded-[14px] border border-slate-200 bg-white"
              key={`${car.brand}-${car.title}-${car.href}`}
            >
              <Link className="block" href={car.href}>
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-slate-100">
                  {car.imageUrl ? (
                    <Image
                      alt={car.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      src={car.imageUrl}
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-500">No image</span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {car.brand}
                </p>
                <h3 className="mt-1 text-base font-semibold text-slate-950">{car.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{car.specsLabel}</p>
                <p className="mt-3 text-xl font-bold text-slate-950">{car.priceLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {car.tags.map((tag) => (
                    <span
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[14px] border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500 md:col-span-2 lg:col-span-4">
            Ads are unavailable right now.
          </div>
        )}
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
