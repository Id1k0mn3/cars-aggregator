import { SiteHeader } from "@/src/widgets/site-header";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
          Car marketplace
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Find the right car from trusted listings
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
          Static Home page shell prepared for the search, listings, categories, brands, trust, and
          footer sections that will be added in the next implementation steps.
        </p>
      </section>
    </main>
  );
};

// export function HomePage() {
//   return (
//     <main className="min-h-screen bg-zinc-50 text-zinc-950">
//       <SiteHeader />

//       <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
//         <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
//           Car marketplace
//         </p>
//         <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
//           Find the right car from trusted listings
//         </h1>
//         <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
//           Static Home page shell prepared for the search, listings, categories, brands, trust,
//           and footer sections that will be added in the next implementation steps.
//         </p>
//       </section>
//     </main>
//   );
// }
