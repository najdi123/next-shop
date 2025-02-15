"use client";
import React from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

type Props = {
  price: Product["price"];
  sizes: Product["sizes"];
  selectedSize: string; // <-- new prop
  onSizeSelect: (size: string) => void; // <-- new prop
  onAddToCart: () => void; // <-- new prop
};

export default function ProductInfo({
  price,
  sizes,
  selectedSize,
  onSizeSelect,
  onAddToCart,
}: Props) {
  return (
    <div className="m-auto py-4">
      <p className="text-2xl font-bold text-primary">Price: ${price}</p>

      {/* Available Sizes */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Available Sizes:</h3>
        <div className="flex space-x-3 mt-2">
          {sizes.map((size) => (
            <Button
              key={size}
              // Highlight the currently selected size
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => onSizeSelect(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button onClick={onAddToCart}>Add to Cart</Button>
    </div>
  );
}
