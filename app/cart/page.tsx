"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemView from "./_components/cartItemView";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) =>
    Object.values(state.cart.items)
  );
  const router = useRouter();

  if (cartItems.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <Container>
      <div className="flex justify-between my-10">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="px-4 py-2"
        >
          ← Back
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cartItems.map((item) => (
          <CartItemView
            key={`${item.product.id}_${item.color}_${item.size}`} // Unique key
            item={item}
          />
        ))}
      </div>
    </Container>
  );
}
