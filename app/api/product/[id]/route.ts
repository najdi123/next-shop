import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params;
        const filePath = path.join(process.cwd(), "data", "products.json");

        const fileContents = fs.readFileSync(filePath, "utf8");
        const products = JSON.parse(fileContents);


        // Find the product by ID
        const product = products.find((p: { id: number }) => p.id === Number(id));

        if (!product) {
            console.error("❌ Product not found for ID:", id);
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("❌ Error reading product:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
