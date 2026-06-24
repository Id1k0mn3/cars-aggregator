type IconProps = {
  label: string;
};

export function BodyTypeIcon({ label }: IconProps) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("pick")) {
    return <PickupIcon />;
  }

  if (normalizedLabel.includes("commercial")) {
    return <CommercialIcon />;
  }

  if (normalizedLabel.includes("convertible")) {
    return <ConvertibleIcon />;
  }

  if (normalizedLabel.includes("coupe")) {
    return <CoupeIcon />;
  }

  if (normalizedLabel.includes("wagon")) {
    return <WagonIcon />;
  }

  if (normalizedLabel.includes("hatch")) {
    return <HatchbackIcon />;
  }

  if (
    normalizedLabel.includes("crossover") ||
    normalizedLabel.includes("off-road") ||
    normalizedLabel.includes("suv")
  ) {
    return <SuvIcon />;
  }

  return <SedanIcon />;
}

export function getBrandInitials(label: string) {
  return label
    .split(/\s|-|\//)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function QuickFilterIcon({ label }: IconProps) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("electric")) {
    return <BoltIcon />;
  }

  if (normalizedLabel.includes("hybrid")) {
    return <LeafIcon />;
  }

  if (normalizedLabel.includes("diesel")) {
    return <FuelIcon />;
  }

  if (normalizedLabel.includes("under")) {
    return <PriceIcon />;
  }

  return <CarIcon />;
}

function SedanIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M7 15h26l-3-6H16l-5 6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M4 15h32v4H4v-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M11 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HatchbackIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M7 15h25l-5-7H16l-6 4-3 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M5 15h28v4H5v-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WagonIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M6 15h28l-3-7H14l-5 7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M4 15h32v4H4v-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SuvIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M6 14h28l-4-7H15l-6 7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M4 14h32v5H4v-5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm17 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CoupeIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M7 15h27l-5-5c-4-3-11-3-15 0l-7 5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M5 15h30v4H5v-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm17 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ConvertibleIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M7 15h26l-4-4H17l-5 4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M5 15h30v4H5v-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path
        d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm17 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M5 8h22v11H5V8Zm22 4h5l3 3v4h-8v-7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 40 24">
      <path
        d="M5 11h12v8H5v-8Zm12 4h18v4H17v-4Zm1-7h8l5 7H17l1-7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 14h16l-2-5H8l-4 5Zm1 0h14v4H5v-4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m13 2-8 11h6l-1 9 9-12h-6l0-8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M6 3h8v18H6V3Zm1 6h6M14 7l4 4v7a2 2 0 0 0 4 0v-5l-4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 4c-8.5.2-14 4.4-14 10.2A5.8 5.8 0 0 0 11.8 20C17.6 20 21.8 14.5 22 6V4h-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M4 20c3-6 8-9 14-10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
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
