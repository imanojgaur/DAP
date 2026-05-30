"use server";

import Razorpay from "razorpay";
import prisma from "@/lib/prisma";

// Renamed for clarity!
export async function createRazorpayOrder(userId: string, totalAmountInPaise: number, addressId: string) {
  try {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      throw new Error("CRITICAL: Razorpay keys are missing from environment variables.");
    }
    const razorpay = new Razorpay({
      key_id:key_id,
      key_secret: key_secret,
    });

    const options = {
      amount: totalAmountInPaise, 
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(2)}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const dbOrder = await prisma.order.create({
      data: {
        userId: userId,
        totalPrice: totalAmountInPaise, 
        status: "PENDING",
        sourceLocation: "Main Nursery", 
        razorpayOrderId: razorpayOrder.id,
        isPaid: false,
      },
    });
    //next.js searilization
    return JSON.parse(JSON.stringify(razorpayOrder));

  } catch (error) {
    console.error("Payment initialization failed:", error);
    throw new Error("Failed to create order");
  }
}