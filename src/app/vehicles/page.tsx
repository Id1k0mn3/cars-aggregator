import { VehiclesPage } from "@/src/views/vehicles-page";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  return <VehiclesPage searchParams={await searchParams} />;
}
