type VehicleIconProps = {
  className?: string;
};

export function EyeIcon({ className = "size-4" }: VehicleIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 12s3-5.5 8.5-5.5S20.5 12 20.5 12s-3 5.5-8.5 5.5S3.5 12 3.5 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.75 12a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HeartIcon({ className = "size-4" }: VehicleIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2 6.8a4.7 4.7 0 0 0-6.65 0L12 8.35 10.45 6.8a4.7 4.7 0 0 0-6.65 6.65L12 21l8.2-7.55a4.7 4.7 0 0 0 0-6.65Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function MapPinIcon({ className = "size-4" }: VehicleIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M10 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "size-4" }: VehicleIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 4.5 9.25 4a1.25 1.25 0 0 1 1.45.9l.75 2.75a1.25 1.25 0 0 1-.35 1.25l-1.15 1.1a10.5 10.5 0 0 0 4.05 4.05l1.1-1.15a1.25 1.25 0 0 1 1.25-.35l2.75.75a1.25 1.25 0 0 1 .9 1.45L19.5 17a2.5 2.5 0 0 1-2.45 2 12.05 12.05 0 0 1-12.05-12.05A2.5 2.5 0 0 1 7 4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function TagIcon({ className = "size-4" }: VehicleIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.25V5.5A1.5 1.5 0 0 1 5.5 4h6.75a2 2 0 0 1 1.4.58l5.77 5.77a2 2 0 0 1 0 2.83l-6.24 6.24a2 2 0 0 1-2.83 0l-5.77-5.77A2 2 0 0 1 4 12.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.25 8.25h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
