import ProductDetails from "@/app/_components/productDetails";
import { Product } from "@/types";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  //Fetch product on the server side
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1 className="text-red-500 text-xl">Product Not Found</h1>;
  }

  const product: Product = await res.json();

  return <ProductDetails productId={Number(id)} initialProduct={product} />;
}
