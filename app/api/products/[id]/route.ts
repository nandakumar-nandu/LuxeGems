/**
 * 📁 app/api/products/[id]/route.ts
 * 📁 API route for fetching a single product by ID from MongoDB or JSON fallback.
 * ⚙️ Connects to the database, queries by route params ID, and returns product details or a 404.
 * 🔗 Imports Next.js server helpers, mongoose connector, Product database model, and JSON fallback helpers.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isUsingMockDb } from "@/lib/db/mongoose";
import { Product } from "@/lib/models/Product";
import { readMockProducts } from "@/lib/db/mockDb";

/**
 * 🎯 GET
 * 🎯 Handles incoming HTTP GET requests for single product retrieval.
 *
 * @param request - NextRequest object
 * @param context - Route context params containing the product ID
 * @returns NextResponse containing product details, 404 not found, or 500 error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. ⚙️ Connect: Establish secure connection to MongoDB via cached pool
    await connectToDatabase();

    // 2. ⚙️ Extract ID: Retrieve target product ID from request parameters
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID parameter is required" },
        { status: 400 }
      );
    }

    // 3. ⚙️ Handle Mock DB Fallback
    if (isUsingMockDb()) {
      const mockProducts = readMockProducts();
      const mockProduct = mockProducts.find((product) => product._id === id);

      if (!mockProduct) {
        return NextResponse.json(
          { error: "Product not found in local catalog file" },
          { status: 404 }
        );
      }

      return NextResponse.json(mockProduct, { status: 200 });
    }

    // 4. ⚙️ Query: Retrieve the item by its unique Mongoose Object ID
    const product = await Product.findById(id);

    // 5. ⚙️ Validate: If product does not exist, return HTTP 404 Not Found error
    if (!product) {
      return NextResponse.json(
        { error: "Product not found in database catalog" },
        { status: 404 }
      );
    }

    // 6. ⚙️ Respond: Return successfully retrieved product data
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // 7. ⚙️ Error Handler: Check for invalid ObjectId formats or other server faults
    console.error(`❌ GET /api/products/${params.id} handler error:`, error);
    return NextResponse.json(
      { error: "Server encountered an error retrieving product details" },
      { status: 500 }
    );
  }
}
