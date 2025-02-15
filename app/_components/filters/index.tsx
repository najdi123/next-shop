import { Product, ProductFilters } from "@/types";

export function applyFilters(products: Product[], filters: ProductFilters) {
  const { color, size } = filters;

  return products.filter((product) => {
    // Color filter
    if (color) {
      // If product doesn't have this color, exclude it
      const hasColor = product.colors.some((c) => c.name === color);
      if (!hasColor) return false;
    }

    // Size filter
    if (size) {
      // If product doesn't have this size, exclude it
      const hasSize = product?.sizes?.includes(size);
      if (!hasSize) return false;
    }

    // If item passes all checks, keep it
    return true;
  });
}
