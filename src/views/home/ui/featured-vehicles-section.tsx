import Link from "next/link";

import { VehicleImageFrame } from "@/src/entities/vehicle";

import type { HomeVehicleCard } from "../model/home-page-types";

type FeaturedVehiclesSectionProps = {
  featuredCars: HomeVehicleCard[];
};

export function FeaturedVehiclesSection({ featuredCars }: FeaturedVehiclesSectionProps) {
  return (
    <>
      <SectionHeader />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {featuredCars.length > 0 ? <FeaturedVehicleList cars={featuredCars} /> : <EmptyState />}
      </section>
    </>
  );
}

type FeaturedVehicleListProps = {
  cars: HomeVehicleCard[];
};

function FeaturedVehicleList({ cars }: FeaturedVehicleListProps) {
  return cars.map((car) => (
    <FeaturedVehicleCard car={car} key={`${car.brand}-${car.title}-${car.href}`} />
  ));
}

type FeaturedVehicleCardProps = {
  car: HomeVehicleCard;
};

function FeaturedVehicleCard({ car }: FeaturedVehicleCardProps) {
  return (
    <article className="group overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <Link className="block" href={car.href}>
        <VehicleImage car={car} />
      </Link>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{car.brand}</p>
        <h3 className="mt-1 text-base font-semibold text-slate-950">{car.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{car.specsLabel}</p>
        <p className="mt-3 text-xl font-bold text-slate-950">{car.priceLabel}</p>
        <VehicleTags tags={car.tags} />
      </div>
    </article>
  );
}

type VehicleImageProps = {
  car: HomeVehicleCard;
};

function VehicleImage({ car }: VehicleImageProps) {
  return (
    <div className="relative">
      <VehicleImageFrame
        className="h-44"
        eyebrow={car.brand}
        imageUrl={car.imageUrl}
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        title={car.title}
      />
      <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
        Featured
      </span>
      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm">
        <HeartIcon />
      </span>
    </div>
  );
}

type VehicleTagsProps = {
  tags: string[];
};

function VehicleTags({ tags }: VehicleTagsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500"
          key={tag}
        >
          <TagIcon />
          {tag}
        </span>
      ))}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2 6.8a4.7 4.7 0 0 0-6.65 0L12 8.35 10.45 6.8a4.7 4.7 0 0 0-6.65 6.65L12 21l8.2-7.55a4.7 4.7 0 0 0 0-6.65Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.25V5.5A1.5 1.5 0 0 1 5.5 4h6.75a2 2 0 0 1 1.4.58l5.77 5.77a2 2 0 0 1 0 2.83l-6.24 6.24a2 2 0 0 1-2.83 0l-5.77-5.77A2 2 0 0 1 4 12.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.25 8.25h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[14px] border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500 md:col-span-2 lg:col-span-4">
      Ads are unavailable right now.
    </div>
  );
}

function SectionHeader() {
  return (
    <section className="mx-auto mt-9 flex w-full max-w-7xl items-baseline justify-between px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">Fresh ads</h2>
      <Link className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700" href="/vehicles">
        View all
      </Link>
    </section>
  );
}
