import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { verifyRazorpayPaymentAction } from "@/actions/payment-verify";
import { placeOrderAction } from "@/actions/place-order";
import { createRazorpayOrder } from "@/actions/razorpay-orders";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useCartStore } from "@/store/cart-store";

const RazorpayResponseSchema = z.object({
    razorpay_payment_id: z.string(),
    razorpay_order_id: z.string(),
    razorpay_signature: z.string(),
});

export type RazorpaySuccessResponse = z.infer<typeof RazorpayResponseSchema>;

// 1. Manually define the Frontend Types
// Define the exact shape of a Razorpay failure event
interface RazorpayErrorResponse {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        metadata: {
            order_id: string;
            payment_id: string;
        };
    };
}

interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (response: RazorpayErrorResponse) => void): void;
}

interface RazorpayConstructorOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: unknown) => void | Promise<void>;
    theme?: { color: string };
}

// 2. Augment the global Window object without importing the backend package
declare global {
    interface Window {
        Razorpay: new (options: RazorpayConstructorOptions) => RazorpayInstance;
    }   
}

export function useCheckout(addressId: string) {
    const [isPlaced, setIsPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //pull out data and rename it session.
    const { data: session } = useSession();
    const router = useRouter();

    const storeItems = useCartStore((state) => state.items);
    const clearZustandCart = useCartStore((state) => state.clearCart);
    const totalAmoutnt = storeItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

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
        if (!session?.user?.id) {
            router.push("/login");
            return;
        }

        setIsLoading(true);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert("Failed to load Razorpay SDK. Please check your internet.");
            setIsLoading(false);
            return;
        }

        try {
            const order = await createRazorpayOrder(
                session.user.id,
                totalAmoutnt,
                addressId,
            );

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "DAP Systems",
                description: "Complete your purchase",
                order_id: order.id,

                handler: async (response: unknown) => {
                    const safeResponse = RazorpayResponseSchema.parse(response);

                    console.log("Payment Success! Verifying signature...");

                    const verification = await verifyRazorpayPaymentAction(
                        safeResponse.razorpay_payment_id,
                        safeResponse.razorpay_order_id,
                        safeResponse.razorpay_signature,
                    );

                    if (verification.success) {
                        console.log("Payment officially verified on the server!");
                        clearZustandCart();
                        setIsPlaced(true);
                    } else {
                        alert("Security Alert: Payment verification failed.");
                        setIsLoading(false);
                    }
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
        totalAmoutnt,
        isLoading,
        isPlaced,
        handleOrderPlacement,
        handleOnlinePayment,
    };
}
