"use client";
import { useGetProductByIdQuery } from "../store/apiSlice";

export default function ProductDetails({ productId }: { productId: number }) {
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img
        src={product.images[product.colors[0]]}
        alt={product.name}
        width={300}
      />
      <p>Price: ${product.price}</p>
      <div>
        <h3>Available Sizes:</h3>
        {product.sizes.map((size: string) => (
          <span key={size} className="border p-1 m-1">
            {size}
          </span>
        ))}
      </div>
      <div>
        <h3>Customer Reviews:</h3>
        {product.reviews.map(
          (review: { name: string; review: string }, index: number) => (
            <div key={index} className="border p-2">
              <strong>{review.name}:</strong> {review.review}
            </div>
          )
        )}
      </div>
    </div>
  );
}
