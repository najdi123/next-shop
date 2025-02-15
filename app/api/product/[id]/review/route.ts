import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { name, review } = await req.json();

        const filePath = path.join(process.cwd(), "data", "products.json");
        const fileContents = fs.readFileSync(filePath, "utf8");
        const products = JSON.parse(fileContents);

        // Find product by ID
        const product = products.find((p: { id: number }) => p.id === Number(id));

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Add new review
        const newReview = {
            name,
            review,
            timestamp: new Date().toISOString(),
        };
        product.reviews.unshift(newReview);

        // Save updated products back to file
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("❌ Error adding review:", error);
        return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
    }
}
