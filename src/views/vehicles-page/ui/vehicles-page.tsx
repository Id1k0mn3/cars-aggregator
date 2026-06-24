import Link from "next/link";

import { getBodyTypes, getBrandTypes, getFuelTypes } from "@/src/entities/dictionary";
import { DEFAULT_VEHICLE_PER_PAGE, getVehicles, VehicleHorizontalCard } from "@/src/entities/vehicle";
import {
  parseVehicleFilterSearchParams,
  SelectedVehicleFilters,
  serializeVehicleFilterParams,
  VehicleFilterPanel,
} from "@/src/features/vehicle-filters";
import { isApiClientError } from "@/src/shared/api";
import { SiteHeader } from "@/src/widgets/site-header";

import { mapVehicleToHorizontalCard } from "../model/vehicle-card-mappers";

type VehiclesPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const defaultDictionaries = {
  bodyTypes: [],
  brandTypes: [],
  fuelTypes: [],
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (isApiClientError(error)) {
    return error.payload?.message ?? error.message;
  }

  return fallback;
};

export async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const parsedFilters = parseVehicleFilterSearchParams(searchParams);
  const shouldFetchVehicles = parsedFilters.validationMessages.length === 0;

  const [brandTypesResult, fuelTypesResult, bodyTypesResult, vehiclesResult] = await Promise.allSettled([
    getBrandTypes(),
    getFuelTypes(),
    getBodyTypes(),
    shouldFetchVehicles ? getVehicles(parsedFilters.filters) : Promise.resolve(null),
  ]);

  const dictionaries = {
    bodyTypes: bodyTypesResult.status === "fulfilled" ? bodyTypesResult.value : [],
    brandTypes: brandTypesResult.status === "fulfilled" ? brandTypesResult.value : [],
    fuelTypes: fuelTypesResult.status === "fulfilled" ? fuelTypesResult.value : [],
  };

  const dictionaryFailed =
    brandTypesResult.status === "rejected" ||
    fuelTypesResult.status === "rejected" ||
    bodyTypesResult.status === "rejected";
  const vehiclesFailed = vehiclesResult.status === "rejected";
  const vehicleErrorMessage =
    vehiclesResult.status === "rejected"
      ? getApiErrorMessage(vehiclesResult.reason, "Failed to load vehicles.")
      : null;
  const validationMessages =
    vehiclesResult.status === "rejected" &&
    isApiClientError(vehiclesResult.reason) &&
    vehiclesResult.reason.status === 422
      ? [getApiErrorMessage(vehiclesResult.reason, "Backend rejected selected filters.")]
      : parsedFilters.validationMessages;
  const vehicleList = vehiclesResult.status === "fulfilled" ? vehiclesResult.value : null;
  const vehicles = vehicleList?.items ?? [];
  const filterPanelKey = serializeVehicleFilterParams(parsedFilters.filters).toString();
  const totalLabel =
    vehicleList?.total === null || vehicleList === null
      ? `${vehicles.length} shown`
      : new Intl.NumberFormat("en-US").format(vehicleList.total);
  const currentPage = parsedFilters.filters.page ?? 1;
  const perPage = parsedFilters.filters.per_page ?? DEFAULT_VEHICLE_PER_PAGE;
  const hasNextPage =
    vehicleList === null
      ? false
      : vehicleList.total === null
        ? vehicles.length >= perPage
        : currentPage * perPage < vehicleList.total;
  const hasPreviousPage = currentPage > 1;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Home / <Link href="/vehicles">Buy cars</Link>
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Vehicles for sale
            </h1>
          </div>
          <SelectedVehicleFilters currentFilters={parsedFilters.filters} dictionaries={dictionaries} />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <VehicleFilterPanel
          currentFilters={parsedFilters.filters}
          dictionaries={dictionaryFailed ? defaultDictionaries : dictionaries}
          key={filterPanelKey}
          validationMessages={validationMessages}
        />

        <div>
          <div className="mb-4">
            <div>
              <p className="text-sm text-slate-500">
                Found <strong className="text-slate-950">{totalLabel}</strong> vehicles
              </p>
              {dictionaryFailed ? (
                <p className="mt-1 text-sm text-orange-700">Failed to load filter options.</p>
              ) : null}
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-3 rounded-xl bg-gradient-to-r from-slate-900 to-blue-600 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Sell your car faster</p>
              <p className="text-sm text-blue-100">
                Free placement foundation with a marketplace-style buyer flow.
              </p>
            </div>
            <Link
              className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-bold text-blue-700"
              href="/ads/create"
            >
              Add ad
            </Link>
          </div>

          {vehiclesFailed ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
              {vehicleErrorMessage ?? "Failed to load vehicles."}
            </div>
          ) : null}

          {!shouldFetchVehicles ? (
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-800">
              Fix selected filters before loading vehicles.
            </div>
          ) : null}

          {shouldFetchVehicles && !vehiclesFailed && vehicles.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
              No vehicles found for selected filters.
            </div>
          ) : null}

          {shouldFetchVehicles && !vehiclesFailed && vehicles.length > 0 ? (
            <div className="grid gap-4">
              {vehicles.map((vehicle) => (
                <VehicleHorizontalCard
                  key={vehicle.id}
                  vehicle={mapVehicleToHorizontalCard(vehicle)}
                />
              ))}
            </div>
          ) : null}

          <PaginationControls
            currentPage={currentPage}
            currentFilters={parsedFilters.filters}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      </section>
    </main>
  );
}

type PaginationControlsProps = {
  currentPage: number;
  currentFilters: Parameters<typeof serializeVehicleFilterParams>[0];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

function PaginationControls({
  currentPage,
  currentFilters,
  hasNextPage,
  hasPreviousPage,
}: PaginationControlsProps) {
  const createHref = (page: number) => {
    const params = serializeVehicleFilterParams(currentFilters);
    params.set("page", page.toString());

    return `/vehicles?${params.toString()}`;
  };

  return (
    <div className="mt-6 flex justify-center gap-2">
      {hasPreviousPage ? (
        <Link
          className="min-h-9 min-w-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-600"
          href={createHref(currentPage - 1)}
        >
          Previous
        </Link>
      ) : (
        <span className="min-h-9 min-w-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-400">
          Previous
        </span>
      )}
      <span className="min-h-9 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white">
        Page {currentPage}
      </span>
      {hasNextPage ? (
        <Link
          className="min-h-9 min-w-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-600"
          href={createHref(currentPage + 1)}
        >
          Next
        </Link>
      ) : (
        <span className="min-h-9 min-w-24 rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-400">
          Next
        </span>
      )}
    </div>
  );
}
