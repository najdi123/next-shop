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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    skip: !!initialProduct,
  });

  const displayedProduct = product || initialProduct;

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const dispatch = useDispatch();

  if (error) {
    return (
      <div className="text-red-500 text-center text-lg font-semibold">
        Error loading product
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size first.");
      return;
    }
    dispatch(
      addToCart({
        product: displayedProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      })
    );
    alert("Product added to cart!");
  };

  return (
    <Card className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between">
        {/* Product Name & Description */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            {displayedProduct.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {displayedProduct.description}
          </p>
        </div>
        <Button variant="outline" className="px-4 py-2">
          <Link href="/cart">Go to Cart</Link>
        </Button>
      </div>

      {/* Responsive Layout for Image & Product Info */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <ImageDisplayer
          images={displayedProduct.images as Record<string, string>}
          productName={displayedProduct.name}
          isFetching={isFetching}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        <Separator vertical className="hidden lg:block" />

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
    </Card>
  );
}
