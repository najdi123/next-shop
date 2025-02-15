"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentColor = product.colors[selectedColorIndex];
  const currentImage = currentColor.image;

  const handleColorClick = (index: number) => {
    setSelectedColorIndex(index);
  };

  return (
    <Card className="bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105">
      <Link href={`/product/${product.id}`} passHref>
        <div className="relative cursor-pointer">
          <Image
            src={currentImage}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <h2 className="text-xl font-semibold text-foreground">
          {product.name}
        </h2>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold text-primary">${product.price}</p>

        {/* Colors Display */}
        <div className="mt-2 flex space-x-2">
          {product.colors.map((color, index) => (
            <div
              key={color.hex} // or color.name
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                index === selectedColorIndex
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorClick(index)}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <Link href={`/product/${product.id}`} passHref>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
