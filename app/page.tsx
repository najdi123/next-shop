import { Product } from "@/types";
import ClientHome from "./_components/clientHome";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  // SSR fetch to API route
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products: Product[] = await res.json();

  return (
    <Container className="py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Featured Products
        </h1>
        <Button variant="outline" className="px-4 py-2">
          <Link href="/cart">Go to Cart</Link>
        </Button>
      </div>

      <ClientHome initialProducts={products} />
    </Container>
  );
}
