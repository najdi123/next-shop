import { Product } from "@/types";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the products.json file
    const filePath = path.join(process.cwd(), "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const products: Product[] = JSON.parse(fileContents);

    // Map through products to only add necessary info
    const simplifiedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,

      colors: product.colors,
    }));

    // Send the simplified products as response
    return new Response(JSON.stringify(simplifiedProducts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error reading products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
