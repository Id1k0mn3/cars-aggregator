import { SiteHeader } from "@/src/widgets/site-header";

const steps = ["Vehicle data", "Photos", "Price and contacts"];

const vehicleFields = [
  {
    label: "Car brand *",
    options: ["Select car brand", "BMW", "Toyota", "Volkswagen", "Mercedes-Benz"],
  },
  { label: "Model *", options: ["Select model"] },
  { label: "Year *", options: ["2024", "2023", "2022", "2021", "2020"] },
  { label: "Body type *", options: ["Sedan", "Hatchback", "SUV", "Wagon", "Minivan"] },
  { label: "Fuel type *", options: ["Diesel", "Petrol", "Hybrid", "Electric", "LPG"] },
  { label: "Transmission *", options: ["Automatic", "Manual", "Semi-automatic"] },
];

const plans = [
  {
    features: ["Up to 12 photos", "Basic placement"],
    name: "Standard",
    price: "Free · 30 days",
  },
  {
    badge: "Popular",
    features: ["Top of list for 7 days", "Up to 24 photos"],
    name: "Top",
    price: "4.99 EUR · 30 days",
  },
  {
    features: ["Always above standard ads", "VIP marker"],
    name: "VIP",
    price: "9.99 EUR · 60 days",
  },
];

export function CreateAdPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="mx-auto w-full max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Sell car</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Create an ad in a few minutes</h1>
        <p className="mt-3 text-slate-500">
          Page foundation for a future create-ad flow. Submission and uploads are intentionally
          disabled for now.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center">
          {steps.map((step, index) => (
            <div className="flex flex-1 items-center" key={step}>
              <div className="flex items-center gap-3">
                <span
                  className={
                    index === 0
                      ? "flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white ring-4 ring-blue-100"
                      : "flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-500"
                  }
                >
                  {index + 1}
                </span>
                <span
                  className={
                    index === 0 ? "text-sm font-semibold text-blue-700" : "text-sm text-slate-500"
                  }
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 ? <div className="mx-3 h-px flex-1 bg-slate-200" /> : null}
            </div>
          ))}
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold">Main information</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {vehicleFields.map((field) => (
              <label className="grid gap-1.5" key={field.label}>
                <span className="text-xs font-semibold text-slate-500">{field.label}</span>
                <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Mileage (km) *</span>
              <input
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
                placeholder="For example, 48,000"
                type="number"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Power (hp)</span>
              <input
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
                placeholder="For example, 150"
                type="number"
              />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-slate-500">VIN number</span>
              <input
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm"
                placeholder="17 characters"
              />
              <span className="text-xs text-slate-500">Optional placeholder field.</span>
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-slate-500">Description</span>
              <textarea
                className="min-h-28 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
                placeholder="Describe condition, service history, equipment, and ownership."
              />
            </label>
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold text-slate-500">
            Step 2 · Photos
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {["Main photo", "Add", "Add", "Add", "Add"].map((slot, index) => (
              <button
                className={
                  index === 0
                    ? "aspect-[4/3] cursor-not-allowed rounded-lg border border-blue-100 bg-blue-50/60 text-xs font-medium text-slate-400"
                    : "aspect-[4/3] cursor-not-allowed rounded-lg border border-dashed border-slate-200 text-xs font-medium text-slate-400"
                }
                disabled
                key={`${slot}-${index}`}
                title="Photo uploads are not available yet"
                type="button"
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Upload behavior is not implemented yet.</p>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm">
          <h2 className="border-b border-slate-200 pb-4 text-base font-bold text-slate-500">
            Step 3 · Ad type
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {plans.map((plan, index) => (
              <article
                className={
                  index === 0
                    ? "relative rounded-lg border-2 border-blue-600 bg-blue-50 p-4"
                    : "relative rounded-lg border border-slate-200 bg-white p-4"
                }
                key={plan.name}
              >
                {plan.badge ? (
                  <span className="absolute right-3 top-0 rounded-b-md bg-orange-600 px-2 py-1 text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                ) : null}
                <h3 className="font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.price}</p>
                <ul className="mt-3 grid gap-1 text-xs text-slate-500">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <button
          className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled
          type="button"
        >
          Next: add photos
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Submission is disabled until the create-ad API contract is ready.
        </p>
      </section>
    </main>
  );
}
