"use client";

import { useState } from "react";

import { VehicleImageFrame } from "@/src/entities/vehicle";

type VehicleImageSliderProps = {
  brand: string;
  imageUrls: string[];
  title: string;
};

export function VehicleImageSlider({ brand, imageUrls, title }: VehicleImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageCount = imageUrls.length;
  const hasImages = imageCount > 0;
  const activeImageUrl = hasImages ? imageUrls[activeIndex] : undefined;
  const visibleThumbnails = hasImages
    ? imageUrls.slice(0, 6)
    : [undefined, undefined, undefined, undefined, undefined];

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) => {
      return currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
    });
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) => {
      return currentIndex + 1 >= imageCount ? 0 : currentIndex + 1;
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-80 md:h-[420px]">
        <VehicleImageFrame
          className="absolute inset-0"
          eyebrow={brand}
          imageUrl={activeImageUrl}
          sizes="(min-width: 1024px) 800px, 100vw"
          title={title}
        />

        <span className="absolute bottom-4 right-4 rounded-md bg-black/55 px-3 py-1.5 text-sm font-medium text-white">
          {imageCount} photos
        </span>

        {imageCount > 1 ? (
          <>
            <button
              aria-label="Show previous image"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-blue-700"
              onClick={showPreviousImage}
              type="button"
            >
              <ChevronLeftIcon />
            </button>
            <button
              aria-label="Show next image"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-blue-700"
              onClick={showNextImage}
              type="button"
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-5 gap-0.5 bg-slate-200 md:grid-cols-6">
        {visibleThumbnails.map((imageUrl, index) => {
          const hiddenImageCount = imageCount - visibleThumbnails.length;
          const isLastThumbnail = index === visibleThumbnails.length - 1;
          const isActive = index === activeIndex;

          return (
            <button
              aria-label={`Show image ${index + 1}`}
              className={[
                "relative h-20 overflow-hidden bg-slate-100",
                isActive ? "ring-2 ring-inset ring-blue-600" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={!hasImages}
              key={`${imageUrl ?? "fallback"}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <VehicleImageFrame
                className="absolute inset-0"
                eyebrow={brand}
                imageUrl={imageUrl}
                sizes="20vw"
                title={title}
              />
              {hiddenImageCount > 0 && isLastThumbnail ? (
                <span className="absolute inset-0 flex items-center justify-center bg-slate-950/55 text-sm font-bold text-white">
                  +{hiddenImageCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m14.5 5-7 7 7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m9.5 5 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
