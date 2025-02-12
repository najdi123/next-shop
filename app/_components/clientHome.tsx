"use client";

import { Product } from "@/types";
import { useGetProductsQuery } from "../store/apiSlice";
import ProductCard from "./productCard";

type Props = {
  initialProducts: Product[];
};

export default function ClientHome({ initialProducts }: Props) {
  const { data: productsData, isLoading, error } = useGetProductsQuery(null);

  // Fallback to SSR data if the RTK Query is still loading
  const products = productsData || initialProducts;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
