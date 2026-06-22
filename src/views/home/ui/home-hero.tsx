import type { HeroStat } from "../model/mock-home-data";

type HomeHeroProps = {
  heroStats: HeroStat[];
};

export function HomeHero({ heroStats }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0d1c35_0%,#1a3568_60%,#1e4080_100%)] px-4 py-14 text-white sm:px-6 lg:px-20 lg:py-16">
      <div className="absolute -right-24 -top-24 size-[28rem] rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute bottom-0 right-12 size-80 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          Lithuania & Europe · 47,312 listings
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Find your <span className="text-blue-300">ideal</span> car
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-white/60">
          A focused marketplace for used and new vehicles across Lithuania. Compare, check, and
          choose with less noise.
        </p>

        <form className="mt-9 flex max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30 md:flex-row">
          <label className="sr-only" htmlFor="home-make">
            Make
          </label>
          <select
            className="border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none md:min-w-32 md:border-b-0 md:border-r"
            defaultValue="all"
            id="home-make"
          >
            <option value="all">All makes</option>
            <option value="bmw">BMW</option>
            <option value="toyota">Toyota</option>
            <option value="mercedes">Mercedes</option>
          </select>

          <label className="sr-only" htmlFor="home-model">
            Model
          </label>
          <select
            className="border-b border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 outline-none md:min-w-32 md:border-b-0 md:border-r"
            defaultValue="all"
            id="home-model"
          >
            <option value="all">All models</option>
          </select>

          <label className="sr-only" htmlFor="home-search">
            Search cars
          </label>
          <input
            className="min-h-14 flex-1 px-5 text-sm text-slate-950 outline-none"
            id="home-search"
            placeholder="Year, price, mileage, or keyword..."
            type="search"
          />

          <button className="min-h-14 bg-orange-600 px-7 text-sm font-bold text-white" type="button">
            Search cars
          </button>
        </form>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:flex lg:gap-10">
          {heroStats.map((stat) => (
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
