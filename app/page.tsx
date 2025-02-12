import { Product } from "@/types";
import ClientHome from "./_components/clientHome";

export default async function HomePage() {
  // SSR fetch to API route
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products: Product[] = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <ClientHome initialProducts={products} />
      </div>
    </div>
  );
}
