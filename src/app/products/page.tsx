import { ProductsPage } from "@/src/views/products-page";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  return <ProductsPage searchParams={await searchParams} />;
}
