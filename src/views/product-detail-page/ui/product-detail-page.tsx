import Link from "next/link";

import { VehicleCard } from "@/src/entities/vehicle";
import { SiteHeader } from "@/src/widgets/site-header";

import { mockProductDetails } from "../model/mock-product-detail";

type ProductDetailPageProps = {
  productId: string;
};

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const product = mockProductDetails[productId];

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-950">
        <SiteHeader />
        <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-3 text-slate-500">
            The listing {productId} is not available in the temporary mock data.
          </p>
          <Link
            className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            href="/products"
          >
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  const specs = [
    ["Body type", product.bodyType],
    ["Year", product.year],
    ["Color", product.color],
    ["Engine", product.engine],
    ["Drive", product.drive],
    ["Owners", product.ownerCount],
    ["VIN", product.vin],
    ["Inspection until", product.technicalInspection],
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        <Link className="font-medium text-blue-700" href="/products">
          Back to results
        </Link>
        <span>|</span>
        <span>Home / {product.bodyType} / {product.brand}</span>
      </div>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
            <span>{product.year}</span>
            <span>{product.mileage}</span>
            <span>{product.location}</span>
            <span>Ad #{product.id}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
            New listing
          </span>
          <button className="text-slate-500" type="button">
            Share
          </button>
          <button className="text-slate-500" type="button">
            Report
          </button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-blue-950 via-blue-700 to-sky-500 text-white">
              <p className="text-lg font-semibold text-white/70">{product.title} main photo</p>
              <span className="absolute bottom-4 right-4 rounded-md bg-black/50 px-3 py-1.5 text-sm">
                24 photos
              </span>
            </div>
            <div className="grid grid-cols-5 gap-0.5 bg-slate-200">
              {["1", "2", "3", "4", "+20"].map((item) => (
                <div
                  className="flex h-20 items-center justify-center bg-gradient-to-br from-blue-900 to-sky-500 text-sm font-bold text-white/80"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-5">
            {[
              ["Mileage", product.mileage],
              ["Fuel", product.fuel],
              ["Transmission", product.transmission],
              ["Power", product.power],
              ["Drive", product.drive],
            ].map(([label, value]) => (
              <div className="bg-white p-4 text-center" key={label}>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-5 overflow-x-auto border-b border-slate-200 text-sm">
            {["Specs", "Equipment", "History", "Similar cars"].map((tab, index) => (
              <button
                className={
                  index === 0
                    ? "border-b-2 border-blue-600 pb-3 font-semibold text-blue-700"
                    : "pb-3 text-slate-500"
                }
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5 grid overflow-hidden rounded-xl border border-slate-200 sm:grid-cols-2">
            {specs.map(([label, value]) => (
              <div className="grid grid-cols-2 border-b border-slate-200" key={label}>
                <div className="bg-slate-50 px-4 py-3 text-sm text-slate-500">{label}</div>
                <div className="bg-white px-4 py-3 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <p className="mt-5 rounded-xl bg-white p-5 text-sm leading-7 text-slate-600">
            {product.description}
          </p>
        </div>

        <aside className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-3xl font-bold">{product.price}</p>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Fixed price
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{product.priceNote}</p>
          <div className="mt-5 grid gap-3">
            <button className="rounded-lg bg-blue-600 px-4 py-3 font-bold text-white" type="button">
              Show phone
            </button>
            <button
              className="rounded-lg border-2 border-blue-600 px-4 py-3 font-semibold text-blue-700"
              type="button"
            >
              Message seller
            </button>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {product.seller.initials}
              </div>
              <div>
                <p className="font-semibold">{product.seller.name}</p>
                <p className="text-xs text-blue-700">{product.seller.type}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-500">
              <p>3 active ads</p>
              <p>On platform since 2019</p>
              <p>Verified seller</p>
              <p>{product.location} · Added {product.postedAt}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Similar products</h2>
          <Link className="text-sm font-medium text-blue-700" href="/products">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {product.similarProducts.map((similarProduct) => (
            <VehicleCard key={similarProduct.id} product={similarProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}
