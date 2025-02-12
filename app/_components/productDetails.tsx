"use client";
import Image from "next/image";
import { useGetProductByIdQuery } from "../store/apiSlice";
import { Product } from "@/types";

type Props = {
  productId: number;
  initialProduct: Product;
};

export default function ProductDetails({ productId, initialProduct }: Props) {
  const {
    data: product,
    isLoading,
    error,
    isFetching,
  } = useGetProductByIdQuery(productId, {
    skip: !!initialProduct, // Prevent API call if we have initial data
  });

  //Use SSR product first, then replace with fresh data when available
  const displayedProduct = product || initialProduct;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading product</p>;

  return (
    <div>
      <h2>{displayedProduct.name}</h2>
      <p>{displayedProduct.description}</p>

      <div className="relative">
        <Image
          src={displayedProduct.images[displayedProduct.colors[0]]}
          alt={displayedProduct.name}
          width={300}
          height={300}
        />
        {isFetching && (
          <p className="absolute top-0 left-0 bg-white p-1 text-gray-500">
            Updating...
          </p>
        )}
      </div>

      <p>Price: ${displayedProduct.price}</p>

      <div>
        <h3>Available Sizes:</h3>
        {displayedProduct.sizes.map((size: string) => (
          <span key={size} className="border p-1 m-1">
            {size}
          </span>
        ))}
      </div>

      <div>
        <h3>Customer Reviews:</h3>
        {displayedProduct.reviews.map(
          (review: { name: string; review: string }, index: number) => (
            <div key={index} className="border p-2">
              <strong>{review.name}:</strong> {review.review}
            </div>
          )
        )}
      </div>

      {isFetching && (
        <p className="text-gray-500 mt-2">Fetching latest data...</p>
      )}
    </div>
  );
}
