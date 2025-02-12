"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("/api/products")
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img
              src={product.images[product.colors[0]]} // Get the image for the first color
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <div className="mt-2">
              {/* <p className="text-sm">Sizes: {product.sizes.join(", ")}</p> */}
              {/* <p className="text-sm">Colors: {product.colors.join(", ")}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
