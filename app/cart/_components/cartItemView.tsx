"use client";

import React from "react";
import Image from "next/image";
// import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { CartItem } from "@/app/store/cartSlice";

/**
 * Props for displaying a single cart item.
 * No external query; we already have the product details.
 */
type Props = {
  item: CartItem;
};

export default function CartItemView({ item }: Props) {
  // const dispatch = useDispatch();
  const { product, color, size, quantity } = item;

  // Get image based on the selected color
  const colorImage = product.images[color];

  // Handle incrementing quantity
  // const handleIncrement = () => {
  //   dispatch(
  //     updateCartItemQuantity({
  //       productId: product.id,
  //       color,
  //       size,
  //       newQuantity: quantity + 1,
  //     })
  //   );
  // };

  return (
    <div className="border p-4 rounded-md flex items-start space-x-4 shadow-sm">
      {/* Product Image */}
      <div className="w-[100px] h-[100px] relative overflow-hidden">
        {colorImage ? (
          <Image
            src={colorImage}
            alt={`${product.name} - ${color}`}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-muted-foreground">Color: {color}</p>
        <p className="text-muted-foreground">Size: {size}</p>
        <p className="text-muted-foreground flex items-center gap-2">
          Quantity: {quantity}
          {/* Increment quantity button */}
          {/* <button
            onClick={handleIncrement}
            className="px-2 py-1 bg-primary text-white rounded-md"
          >
            +
          </button> */}
        </p>
      </div>
    </div>
  );
}
