"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../store/apiSlice";
import { Product } from "@/types";
import { Separator } from "@/components/ui/separator";
import ImageDisplayer from "./imageDisplayer";
import ProductInfo from "./productInfo";
import { addToCart } from "../../store/cartSlice";
import CustomerReviews from "./customerReviews";
import { store } from "@/app/store/store";

type Props = {
  productId: number;
  initialProduct: Product;
};

export default function ProductDetails({ productId, initialProduct }: Props) {
  const {
    data: product,
    isFetching,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !!initialProduct, // Prevent call if SSR data is already present
  });

  // Use SSR product first, then replace with fresh data when available
  const displayedProduct = product || initialProduct;

  // 1) Local state for color and size
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  // 2) Dispatch function to call our cart actions
  const dispatch = useDispatch();

  if (error) {
    return (
      <div className="text-red-500 text-center text-lg font-semibold">
        Error loading product
      </div>
    );
  }

  // 3) Handler for the "Add to Cart" flow
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size first.");
      return;
    }
    dispatch(
      addToCart({
        // Pass the entire product object instead of just productId
        product: displayedProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      })
    );
    console.log("Store state after addToCart:", store.getState().cart.items);
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Product Name & Description */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {displayedProduct.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          {displayedProduct.description}
        </p>
      </div>

      {/* Responsive Layout for Image & Product Info */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        {/* Pass selectedColor and setter so ImageDisplayer can call back */}
        <ImageDisplayer
          images={displayedProduct.images as Record<string, string>}
          productName={displayedProduct.name}
          isFetching={isFetching}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        <Separator vertical className="hidden lg:block" />

        {/* Pass selectedSize and onSizeSelect so ProductInfo can change the size */}
        <ProductInfo
          price={displayedProduct.price}
          sizes={displayedProduct.sizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
          // Provide the "Add to Cart" callback
          onAddToCart={handleAddToCart}
        />
      </div>

      <Separator />

      {/* Customer Reviews */}
      <CustomerReviews reviews={displayedProduct.reviews} />

      {isFetching && (
        <p className="text-gray-500 mt-4 text-center">
          Fetching latest data...
        </p>
      )}
    </div>
  );
}
