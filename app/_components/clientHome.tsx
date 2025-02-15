"use client";

import React, { useState, useMemo } from "react";
import { Product, ProductFilters } from "@/types";
import { useGetProductsQuery } from "../store/apiSlice";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { applyFilters } from "./filters";
import { ColorFilter } from "./filters/colorFilter";
import { SizeFilter } from "./filters/sizeFilter";

type Props = {
  initialProducts: Product[];
};

export default function ClientHome({ initialProducts }: Props) {
  const { data: productsData, isLoading, error } = useGetProductsQuery(null);
  // Fallback to SSR data if the RTK Query is still loading
  const products = productsData || initialProducts;

  const [filters, setFilters] = useState<ProductFilters>({
    color: undefined,
    size: undefined,
  });

  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    // If products is empty, this loop simply won't add anything
    products?.forEach((p: Product) => {
      // p.sizes is typically ["28","30","32"] or ["M","L","XL"], etc.
      p.sizes?.forEach((s) => sizeSet.add(s));
    });
    return Array.from(sizeSet).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return applyFilters(products, filters);
  }, [products, filters]);

  const handleColorChange = (newColor: string | undefined) => {
    setFilters((prev) => ({ ...prev, color: newColor }));
  };

  const handleSizeChange = (newSize: string | undefined) => {
    setFilters((prev) => ({ ...prev, size: newSize }));
  };

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTitle>Failed to load products.</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row-reverse">
      {/* Filters Section */}
      <div className=" gap-4 m-6 flex sm:flex-col justify-around sm:justify-start">
        <div>
          <ColorFilter
            selectedColor={filters.color}
            onColorChange={handleColorChange}
          />
        </div>
        <div>
          <SizeFilter
            availableSizes={allSizes}
            selectedSize={filters.size}
            onSizeChange={handleSizeChange}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-72 rounded-lg" />
            ))
          : filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                filterColor={filters.color}
              />
            ))}
      </div>
    </div>
  );
}
