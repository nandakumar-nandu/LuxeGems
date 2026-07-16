/**
 * 📁 app/api/webhook/route.ts
 * 📁 Stripe Webhook event receiver endpoint.
 * ⚙️ Listens to success/failure webhooks, verifies secure signatures, and updates order states.
 * 🔗 Imports Stripe, Next.js server helpers, database connections, schemas, and fallbacks.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase, isUsingMockDb } from "@/lib/db/mongoose";
import { Order } from "@/lib/models/Order";
import { readMockOrders, writeMockOrders } from "@/lib/db/mockDb";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

/**
 * 🎯 POST
 * 🎯 Receives raw webhooks from Stripe and dispatches them based on payment status.
 *
 * @param request - NextRequest object containing signature headers and raw payloads
 * @returns NextResponse containing status signals
 */
export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe connection adapter not configured on server" },
      { status: 500 }
    );
  }

  // 1. ⚙️ Read raw text content for payload verification
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing signature header or webhook endpoints secret configuration" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    /**
     * 🔒 Webhook Security (Signature Verification):
     * To prevent malicious entities from spoofing order status payloads (e.g. asserting payment success
     * for unpaid orders), we construct the Stripe Event using the raw payload text, the signature header,
     * and our server's unique endpoint signing secret key.
     * If the payload is modified or the keys do not match, Mongoose and Stripe throw an exception.
     */
    event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Unknown signature validation error";
    console.error(`❌ Stripe Webhook signature verification failed:`, errMsg);
    return NextResponse.json(
      { error: `Signature verification failed: ${errMsg}` },
      { status: 400 }
    );
  }

  // 2. ⚙️ Connect: Establish database pool connection
  await connectToDatabase();

  // 3. ⚙️ Parse Event: Cast checkout session variables from the webhook event
  const session = event.data.object as Stripe.Checkout.Session;

  // 4. ⚙️ Dispatch Event Types:
  switch (event.type) {
    /**
     * 🔒 checkout.session.completed:
     * Fired when the client successfully completes the Stripe checkout gateway payment process.
     * We locate the target pending order record using the checkout session identifier and update status to "Paid".
     */
    case "checkout.session.completed": {
      const sessionId = session.id;
      
      if (isUsingMockDb()) {
        const mockOrders = readMockOrders();
        const orderIndex = mockOrders.findIndex((o) => o.stripeSessionId === sessionId);
        if (orderIndex !== -1) {
          mockOrders[orderIndex].status = "Paid";
          writeMockOrders(mockOrders);
        }
      } else {
        await Order.findOneAndUpdate({ stripeSessionId: sessionId }, { status: "Paid" });
      }
      
      console.log(`✅ Order payment confirmed successfully for Stripe session: ${sessionId}`);
      break;
    }

    /**
     * 🔒 checkout.session.expired:
     * Fired when a checkout session completes its expiration timeout limits without capturing payments.
     * We locate the pending order record and update status to "Failed" to restore lock logs.
     */
    case "checkout.session.expired": {
      const sessionId = session.id;
      
      if (isUsingMockDb()) {
        const mockOrders = readMockOrders();
        const orderIndex = mockOrders.findIndex((o) => o.stripeSessionId === sessionId);
        if (orderIndex !== -1) {
          mockOrders[orderIndex].status = "Failed";
          writeMockOrders(mockOrders);
        }
      } else {
        await Order.findOneAndUpdate({ stripeSessionId: sessionId }, { status: "Failed" });
      }
      
      console.log(`❌ Checkout session has expired before payment: ${sessionId}`);
      break;
    }

    default:
      console.log(`ℹ️ Bypassing unhandled Stripe event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
export const dynamic = "force-dynamic";
