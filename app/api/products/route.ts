import { Product } from "@/types";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the products.json file
    const filePath = path.join(process.cwd(), "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(fileContents);

    // Map through products to only add neccessary info
    const simplifiedProducts = products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
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
