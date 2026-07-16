/**
 * 📁 app/api/products/route.ts
 * 📁 API route for fetching all products from MongoDB or JSON fallback.
 * ⚙️ Connects to the database, parses category and featured query strings, and returns JSON datasets.
 * 🔗 Imports Next.js server helpers, mongoose connector, Product database model, and JSON fallback helpers.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isUsingMockDb } from "@/lib/db/mongoose";
import { Product } from "@/lib/models/Product";
import { readMockProducts } from "@/lib/db/mockDb";

/**
 * 🎯 GET
 * 🎯 Handles incoming HTTP GET requests for product lists.
 *
 * @param request - NextRequest object containing query parameters
 * @returns NextResponse containing list of products or error response
 */
export async function GET(request: NextRequest) {
  try {
    // 1. ⚙️ Connect: Establish secure connection to MongoDB (falls back to mock flag if offline)
    await connectToDatabase();

    // 2. ⚙️ Parse Parameters: Extract query parameters from URL (e.g. ?category=Rings&featured=true)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // 3. ⚙️ Handle Mock DB Fallback
    if (isUsingMockDb()) {
      let mockProducts = readMockProducts();

      // Apply category filter if it exists and is not the default wildcard 'All'
      if (category && category !== "All") {
        mockProducts = mockProducts.filter((product) => product.category === category);
      }

      // Apply featured filter if featured parameter is 'true'
      if (featured === "true") {
        mockProducts = mockProducts.filter((product) => product.isFeatured === true);
      }

      return NextResponse.json(mockProducts, { status: 200 });
    }

    // 4. ⚙️ Build MongoDB Query: Conditionally build the database query object
    const filterQuery: Record<string, string | boolean> = {};

    // Apply category filter if it exists and is not the default wildcard 'All'
    if (category && category !== "All") {
      filterQuery.category = category;
    }

    // Apply featured boolean filter if matches 'true' string
    if (featured === "true") {
      filterQuery.isFeatured = true;
    }

    // 5. ⚙️ Fetch: Execute query against Mongoose Product schema, sorted by newest arrivals first
    const products = await Product.find(filterQuery).sort({ createdAt: -1 });

    // 6. ⚙️ Respond: Return successfully retrieved products array wrapped in a Next JSON response
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // 7. ⚙️ Error Handler: Catch exceptions, log error trace for dev review, and respond with HTTP 500
    console.error("❌ GET /api/products handler error:", error);
    return NextResponse.json(
      { error: "Server encountered an error fetching catalog products" },
      { status: 500 }
    );
  }
}
