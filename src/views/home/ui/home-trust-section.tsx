import type { HomeTrustItem } from "../model/home-page-types";

type HomeTrustSectionProps = {
  trustItems: HomeTrustItem[];
};

export function HomeTrustSection({ trustItems }: HomeTrustSectionProps) {
  return (
    <section className="mt-12 border-y border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {trustItems.map((item) => (
          <article className="p-7 text-center" key={item.title}>
            <p className="text-sm font-bold text-blue-600">{item.icon}</p>
            <h3 className="mt-3 text-sm font-bold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
