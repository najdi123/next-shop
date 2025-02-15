"use client";

import React, { useState } from "react";

type Props = {
  availableSizes: string[];
  selectedSize?: string;
  onSizeChange: (size: string | undefined) => void;
};

export function SizeFilter({
  availableSizes,
  selectedSize,
  onSizeChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-40">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 w-full text-center font-semibold bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
      >
        {isOpen ? "▲ Hide Sizes" : "▼ Filter by Size"}
      </button>

      {/* Filters (only show when open) */}
      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-2">
          {/* "All" button to reset filter */}
          <button
            onClick={() => onSizeChange(undefined)}
            className={`px-3 py-2 rounded-md border transition w-12 h-10 ${
              !selectedSize
                ? "border-2 border-primary ring-2 ring-primary"
                : "border-gray-300"
            }`}
          >
            All
          </button>

          {/* Size buttons */}
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-3 py-2 rounded-md border transition w-12 h-10 text-center ${
                selectedSize === size
                  ? "border-2 border-primary ring-2 ring-primary"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
