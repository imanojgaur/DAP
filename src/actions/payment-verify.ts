// src/actions/razorpay-orders.ts (or verify-payment.ts)
"use server";

import crypto from "crypto";

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

    // 3. Compare the math
    if (expectedSignature === signature) {
        // ✅ SUCCESS! The payment is 100% real.
        // TODO: This is where you tell Supabase to mark the order as "PAID"
        
        return { success: true };
    } else {
        // ❌ FAILURE! Someone is trying to hack your store.
        return { success: false, error: "Payment verification failed." };
    }
}