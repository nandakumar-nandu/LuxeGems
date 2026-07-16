/**
 * 📁 app/api/orders/[trackingId]/route.ts
 * 📁 API route for fetching order details by tracking ID.
 * ⚙️ Connects to DB, queries target order trackingId, and returns order JSON dataset.
 * 🔗 Imports server helpers, database connections, and Order model schemas.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isUsingMockDb } from "@/lib/db/mongoose";
import { Order } from "@/lib/models/Order";
import { readMockOrders } from "@/lib/db/mockDb";

/**
 * 🎯 GET
 * 🎯 Handles incoming HTTP GET requests for order tracking info retrieval.
 *
 * @param request - NextRequest object
 * @param context - Route context params containing the tracking ID
 * @returns NextResponse containing order details, 404 not found, or 500 error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { trackingId: string } }
) {
  try {
    // 1. ⚙️ Connect: Establish secure connection to database via cached pool helper
    await connectToDatabase();

    // 2. ⚙️ Extract Param: Retrieve search tracking identifier from route parameters
    const { trackingId } = params;

    if (!trackingId) {
      return NextResponse.json(
        { error: "Tracking ID parameter is required" },
        { status: 400 }
      );
    }

    // 3. ⚙️ Handle Mock DB Fallback
    if (isUsingMockDb()) {
      const mockOrders = readMockOrders();
      const mockOrder = mockOrders.find((order) => order.trackingId === trackingId);

      if (!mockOrder) {
        return NextResponse.json(
          { error: "Order tracking ID not found in local JSON database" },
          { status: 404 }
        );
      }

      return NextResponse.json(mockOrder, { status: 200 });
    }

    // 4. ⚙️ Query: Retrieve the order by trackingId field
    const order = await Order.findOne({ trackingId });

    // 5. ⚙️ Validate: If order is missing, return HTTP 404 Not Found error
    if (!order) {
      return NextResponse.json(
        { error: "Order tracking ID not found in catalog" },
        { status: 404 }
      );
    }

    // 6. ⚙️ Respond: Return successfully retrieved order data
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    // 7. ⚙️ Error Handler: Capture internal database errors and respond with HTTP 500
    console.error(`❌ GET /api/orders/${params.trackingId} handler error:`, error);
    return NextResponse.json(
      { error: "Server encountered an error retrieving order tracking details" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
