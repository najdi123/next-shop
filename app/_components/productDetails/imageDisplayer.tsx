"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  images: Record<string, string>;
  productName: string;
  isFetching: boolean;
  selectedColor: string; // <-- new prop
  onColorSelect: (color: string) => void; // <-- new prop
};

export default function ImageDisplayer({
  images,
  productName,
  isFetching,
  selectedColor,
  onColorSelect,
}: Props) {
  const imageArray = Object.entries(images);

  // If no color has been selected yet, default to the first one
  useEffect(() => {
    if (!selectedColor && imageArray.length > 0) {
      onColorSelect(imageArray[0][0]);
    }
  }, [selectedColor, imageArray, onColorSelect]);

  // The main image to display is whatever color is selected
  const mainImage = selectedColor ? images[selectedColor] : null;

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
          // If there's no mainImage, either show nothing or a fallback
          <Skeleton className="w-full h-full rounded-lg" />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-3 md:flex-col md:space-x-0 md:space-y-3">
        {imageArray.slice(0, 3).map(([color, imageUrl]) => (
          <button
            key={color}
            className={`border rounded-lg p-1 transition ${
              selectedColor === color ? "border-primary" : "border-gray-300"
            }`}
            onClick={() => onColorSelect(color)}
          >
            <Image
              src={imageUrl}
              alt={`${productName} - ${color}`}
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
