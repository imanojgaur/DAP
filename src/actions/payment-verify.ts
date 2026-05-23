"use server";

import crypto from "node:crypto";

export async function verifyRazorpayPaymentAction(
    paymentId: string, 
    orderId: string, 
    signature: string
) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("Razorpay Secret is missing");

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    if (expectedSignature === signature) {
       
        return { success: true };
    } else {
        return { success: false, error: "Payment verification failed." };
    }
}