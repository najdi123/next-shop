"use client";

import { Product } from "@/types";
import { useGetProductsQuery } from "../store/apiSlice";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";

type Props = {
  initialProducts: Product[];
};

export default function ClientHome({ initialProducts }: Props) {
  const { data: productsData, isLoading, error } = useGetProductsQuery(null);

  // Fallback to SSR data if the RTK Query is still loading
  const products = productsData || initialProducts;

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTitle>Failed to load products.</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-72 rounded-lg" />
          ))
        : products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
