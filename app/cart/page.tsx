"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemView from "./_components/cartItemView";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cart = useSelector((state: RootState) => state.cart);
  console.log("🚀 ~ CartPage ~ cart:", cart);

  if (cartItems.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cartItems.map((item) => (
        <CartItemView
          key={`${item.product.id}-${item.color}-${item.size}`}
          item={item}
        />
      ))}
    </div>
  );
}
