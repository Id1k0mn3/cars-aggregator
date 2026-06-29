"use client";

import Image from "next/image";
import { useState } from "react";

export type VehicleImageFrameProps = {
  className?: string;
  eyebrow?: string;
  imageUrl?: string;
  sizes: string;
  title: string;
};

export function VehicleImageFrame({
  className,
  eyebrow,
  imageUrl,
  sizes,
  title,
}: VehicleImageFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const resolvedImageUrl = imageUrl && !imageFailed ? imageUrl : null;

  return (
    <div
      className={[
        "relative flex items-center justify-center overflow-hidden bg-slate-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {resolvedImageUrl ? (
        <Image
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          onError={() => setImageFailed(true)}
          sizes={sizes}
          src={imageUrl || ""}
          unoptimized
        />
      ) : (
        <VehicleImageFallback eyebrow={eyebrow} title={title} />
      )}
    </div>
  );
}

type VehicleImageFallbackProps = {
  eyebrow?: string;
  title: string;
};

function VehicleImageFallback({ eyebrow, title }: VehicleImageFallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#dbeafe_0%,#bfdbfe_45%,#e0f2fe_100%)] px-5 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/85 text-blue-700 shadow-sm">
        <CameraIcon />
      </div>
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700/75">
            {eyebrow}
          </p>
        ) : null}
        <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">Image unavailable</p>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.75A2.75 2.75 0 0 1 7.75 5h1.1l1.2-1.55A1.2 1.2 0 0 1 11 3h2a1.2 1.2 0 0 1 .95.45L15.15 5h1.1A2.75 2.75 0 0 1 19 7.75v8.5A2.75 2.75 0 0 1 16.25 19h-8.5A2.75 2.75 0 0 1 5 16.25v-8.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
