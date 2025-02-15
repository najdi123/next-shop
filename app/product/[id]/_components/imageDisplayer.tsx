"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

type ColorObject = {
  name: string;
  hex: string;
  image: string;
};

type Props = {
  colors: ColorObject[];
  productName: string;
  isFetching: boolean;
  selectedColor: string;
  onColorSelect: (colorName: string) => void;
};

export default function ImageDisplayer({
  colors,
  productName,
  isFetching,
  selectedColor,
  onColorSelect,
}: Props) {
  // If no color is selected yet, default to the first color in the array
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      onColorSelect(colors[0].name);
    }
  }, [selectedColor, colors, onColorSelect]);

  const selectedColorObj = colors.find((c) => c.name === selectedColor);
  const mainImage = selectedColorObj?.image;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mx-auto">
      {/* Large Image */}
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative overflow-hidden">
        {isFetching ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : mainImage ? (
          <Image
            src={mainImage}
            alt={productName}
            width={400}
            height={400}
            className="rounded-lg object-cover transition-opacity duration-300"
            style={{ opacity: isFetching ? 0.5 : 1 }}
          />
        ) : (
          // Fallback if there's no image for the selected color
          <Skeleton className="w-full h-full rounded-lg" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-3 md:flex-col md:space-x-0 md:space-y-3">
        {colors.slice(0, 3).map((colorObj) => (
          <button
            key={colorObj.name}
            className={`border rounded-lg p-1 transition ${
              selectedColor === colorObj.name
                ? "border-primary"
                : "border-gray-300"
            }`}
            onClick={() => onColorSelect(colorObj.name)}
          >
            <Image
              src={colorObj.image}
              alt={`${productName} - ${colorObj.name}`}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
