"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import type { HomeHeroData } from "../model/home-page-types";

type HomeHeroProps = {
  hero: HomeHeroData;
};

export function HomeHero({ hero }: HomeHeroProps) {
  const router = useRouter();
  const [brandTypeId, setBrandTypeId] = useState("");
  const [bodyTypeId, setBodyTypeId] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    if (brandTypeId) {
      searchParams.set("brand_type_id", brandTypeId);
    }

    if (bodyTypeId) {
      searchParams.set("body_type_id", bodyTypeId);
    }

    if (priceTo) {
      searchParams.set("price_to", priceTo);
    }

    const queryString = searchParams.toString();

    router.push(queryString ? `/vehicles?${queryString}` : "/vehicles");
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0d1c35_0%,#1a3568_60%,#1e4080_100%)] px-4 py-14 text-white sm:px-6 lg:px-20 lg:py-16">
      <div className="absolute -right-24 -top-24 size-[28rem] rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute bottom-0 right-12 size-80 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          {hero.summary}
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Find your <span className="text-blue-300">ideal</span> car
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-white/60">
          A focused marketplace for used and new vehicles across Lithuania. Compare, check, and
          choose with less noise.
        </p>

        <form
          className="mt-9 flex max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30 md:flex-row"
          onSubmit={submitSearch}
        >
          <label className="sr-only" htmlFor="home-car-brand">
            Car brand
          </label>
          <select
            className="border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none md:min-w-32 md:border-b-0 md:border-r"
            id="home-car-brand"
            onChange={(event) => setBrandTypeId(event.target.value)}
            value={brandTypeId}
          >
            <option value="">All car brands</option>
            {hero.searchOptions.carBrands.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="home-body-type">
            Body type
          </label>
          <select
            className="border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none md:min-w-32 md:border-b-0 md:border-r"
            id="home-body-type"
            onChange={(event) => setBodyTypeId(event.target.value)}
            value={bodyTypeId}
          >
            <option value="">All body types</option>
            {hero.searchOptions.bodyTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="home-search">
            Search cars
          </label>
          <span className="flex min-h-14 flex-1 items-center gap-2 px-5 text-slate-500">
            <PriceIcon />
            <input
              className="min-w-0 flex-1 text-sm text-slate-950 outline-none"
              id="home-search"
              min="0"
              onChange={(event) => setPriceTo(event.target.value)}
              placeholder="Max price, EUR"
              step="1"
              type="number"
              value={priceTo}
            />
          </span>

          <button
            className="inline-flex min-h-14 items-center justify-center gap-2 bg-orange-600 px-7 text-sm font-bold text-white transition-colors hover:bg-orange-700"
            type="submit"
          >
            <SearchIcon />
            Search cars
          </button>
        </form>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:flex lg:gap-10">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.25V5.5A1.5 1.5 0 0 1 5.5 4h6.75a2 2 0 0 1 1.4.58l5.77 5.77a2 2 0 0 1 0 2.83l-6.24 6.24a2 2 0 0 1-2.83 0l-5.77-5.77A2 2 0 0 1 4 12.25Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M8.25 8.25h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m20 20-4.2-4.2M10.75 18a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
