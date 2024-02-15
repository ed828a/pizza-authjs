import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Stripe } from "stripe";
import prisma from "@/lib/database";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  console.log("/api/webhook POST");

  const headersList = headers();
  const sig = headersList.get("stripe-signature");
  console.log("sig", sig);

  const body = await req.text();
  console.log("body", body);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    );

    // Successfully constructed event.
    console.log("✅ Success: created event", event.id);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("event.type", event?.type);
  // event types:
  //            1. charge.succeeded
  //            2. checkout.session.completed
  //            3. payment_intent.succeeded
  //            4. payment_intent.created

  if (event?.type === "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    console.log("checkoutSessionCompleted object", checkoutSessionCompleted);
    console.log({ orderId: event.data?.object?.metadata?.orderId });
    const orderId = event?.data?.object.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      try {
        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
          },
        });

        revalidatePath(`/orders/${orderId}`);
        console.log("path validated", `/orders/${orderId}`);
        return NextResponse.json(updatedOrder);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        // On error, log and return the error message.
        if (error! instanceof Error) console.log(error);
        console.log(`❌ Error message: ${errorMessage}`);

        return NextResponse.json(
          { error: `Webhook Error: ${errorMessage}` },
          { status: 400 }
        );
      }
      // updatedOrder no need to reply
    }
  }
  return NextResponse.json("ok");
}
