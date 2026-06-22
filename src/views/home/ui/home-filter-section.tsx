import Link from "next/link";

import type { HomeTile } from "../model/mock-home-data";

type HomeFilterSectionProps = {
  quickFilters: string[];
};

type HomeCategorySectionProps = {
  bodyTypes: HomeTile[];
  popularBrands: HomeTile[];
};

export function HomeFilterSection({ quickFilters }: HomeFilterSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-wrap gap-2 px-4 pt-6 sm:px-6 lg:px-8">
      {quickFilters.map((filter, index) => (
        <button
          className={
            index === 0
              ? "rounded-full border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500"
          }
          key={filter}
          type="button"
        >
          {filter}
        </button>
      ))}
    </section>
  );
}

export function HomeCategorySection({ bodyTypes, popularBrands }: HomeCategorySectionProps) {
  return (
    <>
      <SectionHeader href="/products" title="By body type" />
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {bodyTypes.map((bodyType) => (
          <button
            className="rounded-[10px] border border-slate-200 bg-white p-5 text-center"
            key={bodyType.label}
            type="button"
          >
            <span className="mx-auto flex h-10 items-center justify-center text-sm font-bold text-blue-600">
              {bodyType.icon}
            </span>
            <span className="mt-2 block text-sm font-semibold text-slate-950">{bodyType.label}</span>
            <span className="mt-1 block text-xs text-slate-500">{bodyType.count}</span>
          </button>
        ))}
      </section>

      <SectionHeader title="Popular makes" />
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:grid-cols-8 lg:px-8">
        {popularBrands.map((brand) => (
          <button
            className="rounded-[10px] border border-slate-200 bg-white p-4 text-center"
            key={brand.name}
            type="button"
          >
            <span className="mx-auto flex h-9 w-14 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500">
              {brand.logo}
            </span>
            <span className="mt-2 block text-sm font-semibold text-slate-950">{brand.name}</span>
          </button>
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
