import { useState } from "react";
import { placeOrderAction } from "@/actions/order";
import { createRazorpayOrder } from "@/actions/razorpay-orders";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useCartStore } from "@/store/cart-store";
import { z } from "zod";

const RazorpayResponseSchema = z.object({
    razorpay_payment_id: z.string(),
    razorpay_order_id: z.string(),
    razorpay_signature: z.string(),
});

export interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

declare global {
    interface Window {
        Razorpay: any; 
    }
}

export function useCheckout(addressId: string) {
    const [isPlaced, setIsPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const items = useCartStore((state) => state.items);
    const clearZustandCart = useCartStore((state) => state.clearCart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrderPlacement = async () => {
        setIsLoading(true);
        const res = await placeOrderAction(addressId);
        
        if (res.success) {
            clearZustandCart();
            setIsPlaced(true);
        } else {
            alert(`Order failed: ${res.error}`);
            setIsLoading(false);
        }
    };

    const handleOnlinePayment = async () => {
        setIsLoading(true);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert("Failed to load Razorpay SDK. Please check your internet.");
            setIsLoading(false);
            return;
        }

        try {
            const order = await createRazorpayOrder("dummy_user_id", total);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "DAP Systems",
                description: "Complete your purchase",
                order_id: order.id,
                handler: async (response: RazorpaySuccessResponse) => {

                    const safeResponse = RazorpayResponseSchema.parse(response);

                    console.log("Payment Success! Signature:", safeResponse.razorpay_signature);
                    // Step 3 (Backend Verification) will go here soon!
                    clearZustandCart();
                    setIsPlaced(true);
                },
                theme: { color: "#111111" },
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.on("payment.failed", () => {
                setIsLoading(false);
                alert("Payment failed or was cancelled.");
            });

            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert("Could not initialize payment.");
            setIsLoading(false);
        }
    };

    return {
        total,
        isLoading,
        isPlaced,
        handleOrderPlacement,
        handleOnlinePayment
    };
}