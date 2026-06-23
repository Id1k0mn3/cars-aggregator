import { VehicleDetailPage } from "@/src/views/vehicle-detail-page";

type PageProps = {
  params: Promise<{
    vehicleId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { vehicleId } = await params;

  return <VehicleDetailPage vehicleId={vehicleId} />;
}
