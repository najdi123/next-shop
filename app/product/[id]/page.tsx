import ProductDetails from "@/app/_components/productDetails";
// import { Product } from "@/types";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log("Number(params.id)", Number(id));
  return <ProductDetails productId={Number(id)} />;
}
