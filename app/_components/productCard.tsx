"use client";

import React from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg">
      <Link href={`/product/${product.id}`} passHref>
        <Image
          src={product.images[product.colors[0]]}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover mb-2 cursor-pointer"
        />
      </Link>

      {/* Product Title & Price */}
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>

      {/* Colors Display */}
      <div className="mt-2 flex space-x-2">
        {product.colors.map((color) => (
          <div
            key={color}
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
