import Link from "next/link";

import { getVehicle, type VehicleCardViewModel } from "@/src/entities/vehicle";
import { SiteHeader } from "@/src/widgets/site-header";

import {
  createVehicleDetailError,
  createVehicleSpecs,
  getSimilarVehicles,
} from "../model/vehicle-detail-data";
import {
  mapVehicleToDetailViewModel,
  type VehicleDetailViewModel,
} from "../model/vehicle-detail-mappers";
import type { VehicleDetailSpec } from "../model/vehicle-detail-types";
import { VehicleDetailError } from "./vehicle-detail-error";
import {
  VehicleDetailBreadcrumb,
  VehicleDetailHeader,
  VehiclePricePanel,
  VehicleStatsStrip,
} from "./vehicle-detail-sections";
import { VehicleDetailTabs } from "./vehicle-detail-tabs";
import { VehicleImageSlider } from "./vehicle-image-slider";

type VehicleDetailPageProps = {
  vehicleId: string;
};

export async function VehicleDetailPage({ vehicleId }: VehicleDetailPageProps) {
  let vehicle: VehicleDetailViewModel;
  let similarVehicles: VehicleCardViewModel[];
  let specs: VehicleDetailSpec[];

  try {
    const vehicleEntity = await getVehicle(vehicleId);

    vehicle = mapVehicleToDetailViewModel(vehicleEntity);
    specs = createVehicleSpecs(vehicleEntity);
    similarVehicles = await getSimilarVehicles(vehicleEntity);
  } catch (error) {
    const errorView = createVehicleDetailError(error);

    return <VehicleDetailError message={errorView.message} title={errorView.title} />;
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <VehicleDetailBreadcrumb vehicle={vehicle} />

      <VehicleDetailHeader vehicle={vehicle} />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <VehicleImageSlider
            brand={vehicle.brand}
            imageUrls={vehicle.imageUrls}
            title={vehicle.title}
          />
          <VehicleStatsStrip vehicle={vehicle} />
          <VehicleDetailTabs
            description={vehicle.description}
            similarVehicles={similarVehicles}
            sourceUrl={vehicle.sourceUrl}
            specs={specs}
          />
        </div>

        <VehiclePricePanel vehicle={vehicle} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Link className="text-sm font-medium text-blue-700" href="/vehicles">
          View more vehicles
        </Link>
      </section>
    </main>
  );
}
