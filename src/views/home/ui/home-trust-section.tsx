import type { HomeTrustItem } from "../model/home-page-types";

type HomeTrustSectionProps = {
  trustItems: HomeTrustItem[];
};

export function HomeTrustSection({ trustItems }: HomeTrustSectionProps) {
  return (
    <section className="mt-12 border-y border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {trustItems.map((item) => (
          <article
            className="p-7 text-center transition-colors hover:bg-blue-50/40"
            key={item.title}
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TrustIcon icon={item.icon} />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-600">
              {item.icon}
            </p>
            <h3 className="mt-3 text-sm font-bold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type TrustIconProps = {
  icon: string;
};

function TrustIcon({ icon }: TrustIconProps) {
  switch (icon) {
    case "Finance":
      return <FinanceIcon />;
    case "History":
      return <HistoryIcon />;
    case "Secure":
      return <SecureIcon />;
    case "Verified":
    default:
      return <VerifiedIcon />;
  }
}

function VerifiedIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="m12 3 7 3v5.2c0 4.1-2.7 7.8-7 9.8-4.3-2-7-5.7-7-9.8V6l7-3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m8.75 12 2.25 2.25L15.75 9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 12a8 8 0 1 0 2.35-5.65L4 8.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M4 4.5V8.7h4.2M12 7.5V12l3 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FinanceIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 8h16v10.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V8Zm1.5-4h13A1.5 1.5 0 0 1 20 5.5V8H4V5.5A1.5 1.5 0 0 1 5.5 4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M8 14h3M8 17h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2M6.5 10h11A1.5 1.5 0 0 1 19 11.5v7A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-7A1.5 1.5 0 0 1 6.5 10Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M12 14v2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}
