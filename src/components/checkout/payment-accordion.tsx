"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/providers/cart-store";
import { placeOrderAction } from "@/actions/feed-orders-db";
import { CreditCard, Landmark, QrCode, Banknote } from "lucide-react";
import { OrderSuccessPopup } from "./order-success-popup";

export function PaymentAccordion({ addressId }: { addressId: string }) {
    const [isPlaced, setIsPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const items = useCartStore((state) => state.items);
    const clearZustandCart = useCartStore((state) => state.clearCart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrderPlacement = async () => {
        setIsLoading(true);
        const res = await placeOrderAction(addressId);
        
        if (res.success) {
            clearZustandCart(); // Wipe local Zustand store
            setIsPlaced(true);  // Trigger the "DAM!" Popup
        } else {
            alert("Order failed: " + res.error);
            setIsLoading(false);
        }
    };

    // If order is successful, show the popup and handle redirect
    if (isPlaced) return <OrderSuccessPopup />;

    return (
        <Accordion type="single" collapsible className="w-full space-y-4">
            
            {/* --- UPI OPTION --- */}
            <AccordionItem value="upi" className="border border-gray-200 rounded-xl px-2 data-[state=open]:bg-gray-50/50 transition-colors">
                <AccordionTrigger className="hover:no-underline px-4 py-5">
                    <div className="flex items-start gap-4 text-left">
                        <QrCode className="h-6 w-6 text-gray-700 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">UPI</p>
                            <p className="text-xs text-gray-500 font-normal">Google Pay, PhonePe, Paytm & more</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 pt-2">
                    <div className="flex items-center gap-6 p-4 bg-white border border-gray-100 rounded-xl">
                        <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                             <QrCode className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm mb-2">Scan QR Code</p>
                            <Button disabled={isLoading} onClick={handleOrderPlacement} className="w-full rounded-full bg-[#111] hover:bg-black text-white">
                                {isLoading ? "Processing..." : `Scan & Pay ₹${total.toLocaleString()}`}
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* --- CREDIT/DEBIT CARD OPTION --- */}
            <AccordionItem value="card" className="border border-gray-200 rounded-xl px-2 data-[state=open]:bg-gray-50/50 transition-colors">
                <AccordionTrigger className="hover:no-underline px-4 py-5">
                    <div className="flex items-start gap-4 text-left">
                        <CreditCard className="h-6 w-6 text-gray-700 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">Credit/Debit Card</p>
                            <p className="text-xs text-gray-500 font-normal">Visa, Mastercard, Rupay & more</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 pt-2 space-y-4">
                    <div className="space-y-4">
                        <Input placeholder="Card Number" className="h-12 border-gray-300" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Expiry (MM/YY)" className="h-12 border-gray-300" />
                            <Input placeholder="CVV" type="password" maxLength={3} className="h-12 border-gray-300" />
                        </div>
                        <Button disabled={isLoading} onClick={handleOrderPlacement} className="w-full h-14 rounded-full bg-[#111] hover:bg-black text-white text-lg font-medium mt-4">
                            {isLoading ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* --- CASH ON DELIVERY (THE NEW COD WIRE) --- */}
            <AccordionItem value="cod" className="border border-gray-200 rounded-xl px-2 data-[state=open]:bg-green-50/30 transition-colors">
                <AccordionTrigger className="hover:no-underline px-4 py-5">
                    <div className="flex items-start gap-4 text-left">
                        <Banknote className="h-6 w-6 text-green-700 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">Cash on Delivery</p>
                            <p className="text-xs text-gray-500 font-normal">Pay with cash or UPI at your doorstep</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 pt-2">
                    <div className="p-4 bg-white border border-green-100 rounded-xl mb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Order now and pay when your plants arrive. Our delivery partner will accept Cash or UPI scanning at the time of delivery.
                        </p>
                    </div>
                    <Button 
                        disabled={isLoading} 
                        onClick={handleOrderPlacement} 
                        className="w-full h-14 rounded-full bg-green-700 hover:bg-green-800 text-white text-lg font-bold"
                    >
                        {isLoading ? "Placing Order..." : `Confirm Order (₹${(total/100).toLocaleString()})`}
                    </Button>
                </AccordionContent>
            </AccordionItem>
            
        </Accordion>
    );
}