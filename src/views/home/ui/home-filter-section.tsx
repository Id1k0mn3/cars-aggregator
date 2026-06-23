import Link from "next/link";

import type { HomeCategoryItem, HomeLinkItem } from "../model/home-page-types";

type HomeFilterSectionProps = {
  quickFilters: HomeLinkItem[];
};

type HomeCategorySectionProps = {
  bodyTypes: HomeCategoryItem[];
  popularBrands: HomeCategoryItem[];
};

export function HomeFilterSection({ quickFilters }: HomeFilterSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-wrap gap-2 px-4 pt-6 sm:px-6 lg:px-8">
      {quickFilters.map((filter, index) => {
        const className =
          index === 0
            ? "rounded-full border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
            : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500";

        if (filter.href) {
          return (
            <Link className={className} href={filter.href} key={filter.label}>
              {filter.label}
            </Link>
          );
        }

        return (
          <span className={className} key={filter.label}>
            {filter.label}
          </span>
        );
      })}
    </section>
  );
}

export function HomeCategorySection({ bodyTypes, popularBrands }: HomeCategorySectionProps) {
  return (
    <>
      <SectionHeader href="/vehicles" title="By body type" />
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {bodyTypes.length > 0 ? (
          bodyTypes.map((bodyType) => (
            <Link
              className="rounded-[10px] border border-slate-200 bg-white p-5 text-center"
              href={bodyType.href}
              key={bodyType.label}
            >
              <span className="mx-auto flex h-10 items-center justify-center text-sm font-bold text-blue-600">
                Body
              </span>
              <span className="mt-2 block text-sm font-semibold text-slate-950">
                {bodyType.label}
              </span>
              <span className="mt-1 block text-xs text-slate-500">{bodyType.countLabel}</span>
            </Link>
          ))
        ) : (
          <div className="rounded-[10px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500 lg:col-span-6">
            Body categories are unavailable right now.
          </div>
        )}
      </section>

      <SectionHeader title="Popular car brands" />
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:grid-cols-8 lg:px-8">
        {popularBrands.length > 0 ? (
          popularBrands.map((brand) => (
            <Link
              className="rounded-[10px] border border-slate-200 bg-white p-4 text-center"
              href={brand.href}
              key={brand.label}
            >
              <span className="mx-auto flex h-9 w-14 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500">
                Brand
              </span>
              <span className="mt-2 block text-sm font-semibold text-slate-950">{brand.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{brand.countLabel}</span>
            </Link>
          ))
        ) : (
          <div className="rounded-[10px] border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-500 lg:col-span-8">
            Brand categories are unavailable right now.
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
