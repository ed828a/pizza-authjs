import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const postHeaders = headers();
  // console.log("postHeaders", postHeaders.get("Content-Type"));

  try {
    const { purchaserEmail, address, cartItems } = await req.json();
    console.log({ purchaserEmail, address, cartItems });
    const { phone, streetAddress, city, postcode, country } = address;

    const session = await auth();
    const user = session?.user.id;

    const order = await prisma.order.create({
      data: {
        purchaserEmail,
        phone,
        streetAddress,
        city,
        postcode,
        country,
        purchasedItems: cartItems,
        customerId: session?.user.id,
      },
    });

    // for how to define session, to see https://stripe.com/docs/api/checkout/sessions/create?lang=node
    const stripeLineItems = [];
    for (const product of cartItems) {
      const productName = product.name;
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "AUD",
          product_data: { name: productName },
          unit_amount: product.subPrice * 100,
        },
      });
    }

    console.log("process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: purchaserEmail,
      success_url: `${
        process.env.NEXTAUTH_URL
      }/orders/${order.id.toString()}?clear-cart=1`, // this url is where the app goes after payment succeeded.
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?cancelled=1`, // this url is where the app goes when the payment is cancelled
      metadata: {
        orderId: order.id.toString(), // this orderId is for webhook
      },
      payment_intent_data: {
        metadata: {
          orderId: order.id.toString(), // this orderId is for webhook
        },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "AUD" },
          },
        },
      ],
    });

    console.log("stripeSession.url", stripeSession.url);

    return NextResponse.json(stripeSession.url);
  } catch (error: any) {
    console.log("error", error.message);

    return Response.json({ success: false }, { status: 400 });
  }
}
