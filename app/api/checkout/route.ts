/**
 * 📁 app/api/checkout/route.ts
 * 📁 API route for creating Stripe Checkout Sessions.
 * ⚙️ Connects to DB, creates pending orders, handles Stripe connection, and triggers simulation modes.
 * 🔗 Imports Stripe, Next.js server helpers, mongoose, and custom schemas.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase, isUsingMockDb } from "@/lib/db/mongoose";
import { Order } from "@/lib/models/Order";
import { readMockOrders, writeMockOrders } from "@/lib/db/mockDb";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Initialize Stripe if secret key is present
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

/**
 * 🎯 generateTrackingId
 * 
 * 🎯 Algorithm Explanation:
 * 1. Defines a base string pool containing uppercase letters and single digit numbers (A-Z, 0-9).
 * 2. Selects 4 random indices from this pool and concatenates them to create a unique prefix block.
 * 3. Selects 4 more random indices to construct a unique suffix block.
 * 4. Concatenates these blocks with a brand prefix ("LG") and separates them with hyphens, returning: "LG-XXXX-XXXX".
 * 
 * @returns Formatted tracking identifier string
 */
function generateTrackingId(): string {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let block1 = "";
  let block2 = "";
  for (let i = 0; i < 4; i++) {
    block1 += pool.charAt(Math.floor(Math.random() * pool.length));
    block2 += pool.charAt(Math.floor(Math.random() * pool.length));
  }
  return `LG-${block1}-${block2}`;
}

interface IncomingOrderItem {
  productId?: string;
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/**
 * 🎯 POST
 * 🎯 Handles incoming HTTP POST requests to initialize order checkouts.
 *
 * @param request - NextRequest containing checkout details payload
 * @returns NextResponse containing redirect checkout URLs
 */
export async function POST(request: NextRequest) {
  try {
    // 1. ⚙️ Connect: Establish database connection pool
    await connectToDatabase();

    // 2. ⚙️ Parse Payload: Retrieve items, customerInfo, and shippingAddress from request body
    const body = await request.json();
    const { items, customerInfo, shippingAddress, totalAmount } = body;

    // Validate request structure
    if (!items || !customerInfo || !shippingAddress || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required checkout parameters" },
        { status: 400 }
      );
    }

    // 3. ⚙️ Generate Tracking: Create a unique tracking identifier
    const trackingId = generateTrackingId();

    // 4. ⚙️ Handle Simulation Mode (No Stripe API Key Provided)
    if (!stripe) {
      console.warn("⚠️ Stripe Secret Key missing. Operating in Simulation Mode.");

      const newOrder = {
        trackingId,
        items: items.map((item: IncomingOrderItem) => ({
          productId: item.productId || item.id || item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        customerInfo,
        shippingAddress,
        totalAmount,
        status: "Paid" as const, // Automatically flag as Paid in simulation
        stripeSessionId: "simulated_session_id",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (isUsingMockDb()) {
        const mockOrders = readMockOrders();
        mockOrders.push({
          _id: `mock-order-${Date.now()}`,
          ...newOrder,
          createdAt: newOrder.createdAt.toISOString(),
          updatedAt: newOrder.updatedAt.toISOString(),
        });
        writeMockOrders(mockOrders);
      } else {
        await Order.create(newOrder);
      }

      return NextResponse.json(
        { checkoutUrl: `${NEXT_PUBLIC_APP_URL}/order-success?trackingId=${trackingId}` },
        { status: 200 }
      );
    }

    // 5. ⚙️ Initialize Stripe Session: Map items to Stripe line items formats
    const lineItems = items.map((item: { name: string; image: string; price: number; quantity: number }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${NEXT_PUBLIC_APP_URL}/order-success?trackingId=${trackingId}`,
      cancel_url: `${NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        trackingId,
      },
    });

    // 6. ⚙️ Save Pending Order to Database
    const newOrder = {
      trackingId,
      items: items.map((item: IncomingOrderItem) => ({
        productId: item.productId || item.id || item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      customerInfo,
      shippingAddress,
      totalAmount,
      status: "Pending" as const,
      stripeSessionId: session.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isUsingMockDb()) {
      const mockOrders = readMockOrders();
      mockOrders.push({
        _id: `mock-order-${Date.now()}`,
        ...newOrder,
        createdAt: newOrder.createdAt.toISOString(),
        updatedAt: newOrder.updatedAt.toISOString(),
      });
      writeMockOrders(mockOrders);
    } else {
      await Order.create(newOrder);
    }

    // 7. ⚙️ Return Session URL: Let the client redirect to the hosted Stripe portal
    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error("❌ POST /api/checkout handler error:", error);
    return NextResponse.json(
      { error: "Server encountered an error creating checkout session" },
      { status: 500 }
    );
  }
}
