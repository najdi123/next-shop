"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CartItem,
  updateCartItemQuantity,
  removeFromCart,
} from "@/app/store/cartSlice";

/**
 * Props for displaying a single cart item.
 * No external query; we already have the product details.
 */
type Props = {
  item: CartItem;
};

export default function CartItemView({ item }: Props) {
  const dispatch = useDispatch();
  const { product, color, size, quantity } = item;

  // Get image based on the selected color
  const colorImage = product.images[color];

  // Handle incrementing quantity
  const handleIncrement = () => {
    dispatch(
      updateCartItemQuantity({
        productId: product.id,
        color,
        size,
        newQuantity: quantity + 1,
      })
    );
  };
  const handleDecrement = () => {
    dispatch(
      updateCartItemQuantity({
        productId: product.id,
        color,
        size,
        newQuantity: quantity + 1,
      })
    );
  };
  const handleRemove = () => {
    dispatch(
      removeFromCart({
        productId: product.id,
        color,
        size,
      })
    );
  };

  return (
    <div className="border p-4 rounded-md flex">
      {/* Product Image */}
      {colorImage ? (
        <Image
          src={colorImage}
          alt={`${product.name} - ${color}`}
          className="object-cover rounded-md"
          width={100}
          height={100}
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}

      {/* Product Info */}
      <div className="w-full ml-6">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-muted-foreground">Price: {product.price}</p>
        <p className="text-muted-foreground">Color: {color}</p>
        <p className="text-muted-foreground">Size: {size}</p>
      </div>
      {/* Product quantity */}
      <div className="flex flex-col items-center  gap-2 ml-8">
        <>
          <p className="  text-center">Quantity:</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-primary text-white rounded-md"
            >
              -
            </button>
            <p className=" text-center">{quantity}</p>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-primary text-white rounded-md"
            >
              +
            </button>
          </div>
        </>

        <button
          onClick={handleRemove}
          className="px-2 py-1 mt-6  bg-destructive text-white  rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
