"use client";

import { Banknote, CreditCard, QrCode } from "lucide-react";
import { useState } from "react";
import { placeOrderAction } from "@/actions/order";
import { createRazorpayOrder } from "@/actions/razorpay-orders";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/providers/cart-store";
import { OrderSuccessPopup } from "./order-success-popup";


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export function PaymentAccordion({ addressId }: { addressId: string }) {
    // Component State
    const [isPlaced, setIsPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Zustand State
    const items = useCartStore((state) => state.items);
    const clearZustandCart = useCartStore((state) => state.clearCart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // --- ACTION 1: Cash on Delivery ---
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

    // --- ACTION 2: Razorpay Online Payment ---
    // Moved INSIDE the component so it can access 'total' and 'setIsLoading'
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
                handler: async (response: any) => {
                    console.log("Payment Success! Signature:", response.razorpay_signature);
                    clearZustandCart();
                    setIsPlaced(true);
                },
                theme: { color: "#111111" },
            };

            const paymentObject = new (window as any).Razorpay(options);

            paymentObject.on("payment.failed", () =>  {
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

    // --- THE CONFIGURATION ARRAY ---
    const paymentMethods = [
        {
            id: "upi",
            title: "UPI",
            subtitle: "Google Pay, PhonePe, Paytm & more",
            icon: QrCode,
            iconColor: "text-gray-700",
            theme: "bg-gray-50/50",
            description: "You will be redirected to Razorpay to securely scan a QR code or enter your UPI ID.",
            buttonText: `Pay ₹${total / 100}`,
            buttonClass: "bg-[#111] hover:bg-black text-white",
            action: handleOnlinePayment,
        },
        {
            id: "card",
            title: "Credit/Debit Card",
            subtitle: "Visa, Mastercard, Rupay & more",
            icon: CreditCard,
            iconColor: "text-gray-700",
            theme: "bg-gray-50/50",
            description: "You will be redirected to Razorpay's secure gateway to enter your card details and OTP.",
            buttonText: `Pay ₹${total / 100}`,
            buttonClass: "bg-[#111] hover:bg-black text-white",
            action: handleOnlinePayment,
        },
        {
            id: "cod",
            title: "Cash on Delivery",
            subtitle: "Pay with cash or UPI at your doorstep",
            icon: Banknote,
            iconColor: "text-green-700",
            theme: "bg-green-50/30",
            description: "Order now and pay when your plants arrive. Our delivery partner will accept Cash or UPI scanning.",
            buttonText: `Confirm Order (₹${(total / 100).toLocaleString()})`,
            buttonClass: "bg-green-700 hover:bg-green-800 text-white",
            action: handleOrderPlacement,
        },
    ];

    if (isPlaced) return <OrderSuccessPopup />;

    return (
        <Accordion type="single" collapsible className="w-full space-y-4">
            {/* The Magic: We map over the array so the UI is only written ONCE */}
            {paymentMethods.map((method) => {
                const Icon = method.icon;
                
                return (
                    <AccordionItem
                        key={method.id}
                        value={method.id}
                        className={`border border-gray-200 rounded-xl px-2 transition-colors data-[state=open]:${method.theme}`}
                    >
                        <AccordionTrigger className="hover:no-underline px-4 py-5">
                            <div className="flex items-start gap-4 text-left">
                                <Icon className={`h-6 w-6 mt-0.5 ${method.iconColor}`} />
                                <div>
                                    <p className="font-bold text-gray-900">{method.title}</p>
                                    <p className="text-xs text-gray-500 font-normal">
                                        {method.subtitle}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-6 pt-2">
                            <div className="p-4 bg-white border border-gray-100 rounded-xl mb-4 text-sm text-gray-600 text-center">
                                {method.description}
                            </div>
                            <Button
                                disabled={isLoading}
                                onClick={method.action}
                                className={`w-full h-14 rounded-full text-lg font-medium ${method.buttonClass}`}
                            >
                                {isLoading ? "Processing..." : method.buttonText}
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}