"use client";

import React, { useState } from "react";

type Props = {
  selectedColor?: string;
  onColorChange: (color: string | undefined) => void;
};

const COLOR_OPTIONS = [
  { name: "red", hex: "#D22D40" },
  { name: "blue", hex: "#4B5F7B" },
  { name: "navy", hex: "#2B2D4C" },
  { name: "gray", hex: "#748195" },
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#FFFFFF" },
  { name: "beige", hex: "#D5C9C0" },
];

export function ColorFilter({ selectedColor, onColorChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-40">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 w-full text-center font-semibold bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
      >
        {isOpen ? "▲ Hide Colors" : "▼ Filter by Color"}
      </button>

      {/* Filters (only show when open) */}
      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-2">
          {/* "All" button (resets the filter) */}
          <button
            onClick={() => onColorChange(undefined)}
            className={`w-10 h-10 rounded-full border transition ${
              !selectedColor
                ? "border-2 border-primary ring-2 ring-primary"
                : "border-gray-300"
            }`}
          >
            All
          </button>

          {/* Color buttons */}
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              className={`w-10 h-10 rounded-full border transition ${
                selectedColor === color.name
                  ? "border-2 border-primary ring-2 ring-primary"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
