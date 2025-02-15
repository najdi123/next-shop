"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SeparatorProps = {
  className?: string;
  vertical?: boolean; // Add vertical prop
};

export function Separator({ className, vertical = false }: SeparatorProps) {
  return (
    <div
      className={cn(
        "bg-border my-4",
        vertical
          ? "w-[1px] h-full mx-4" // Vertical separator
          : "w-full h-[1px] my-4", // Horizontal separator (default)
        className
      )}
    />
  );
}
