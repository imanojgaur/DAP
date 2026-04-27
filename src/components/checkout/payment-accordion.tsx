"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/providers/cart-store";
import { placeOrderAction } from "@/actions/order";
import { CreditCard, Landmark, QrCode } from "lucide-react";

export function PaymentAccordion({ addressId }: { addressId: string }) {
    const router = useRouter();
    const items = useCartStore((state) => state.items);
    const clearZustandCart = useCartStore((state) => state.clearCart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        const res = await placeOrderAction(addressId);
        
        if (res.success) {
            clearZustandCart(); // Clear the local browser cart
            // Redirect to a success page! (You can build /orders/success later)
            router.push(`/orders?success=true`); 
        } else {
            alert("Payment failed. Please try again.");
            setIsLoading(false);
        }
    };

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
                        {/* Fake QR Code Box */}
                        <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                             <QrCode className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm mb-2">Scan QR Code</p>
                            <p className="text-xs text-gray-500 mb-4">Use any UPI app on your phone</p>
                            <Button 
                                disabled={isLoading} 
                                onClick={handlePayment} 
                                className="w-full rounded-full bg-[#111] hover:bg-black text-white"
                            >
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
                    <div className="flex gap-2 mb-4">
                        <div className="h-6 w-10 bg-blue-900 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                        <div className="h-6 w-10 bg-red-500 rounded flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                    </div>
                    
                    <div className="space-y-4">
                        <Input placeholder="Card Number" className="h-12 border-gray-300" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Expiry (MM/YY)" className="h-12 border-gray-300" />
                            <Input placeholder="CVV" type="password" maxLength={3} className="h-12 border-gray-300" />
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="rbi" />
                            <label htmlFor="rbi" className="text-xs text-gray-600 font-medium leading-none">
                                Save this as per RBI guidelines. <span className="font-bold text-black cursor-pointer">Know More</span>
                            </label>
                        </div>
                        <Button 
                            disabled={isLoading} 
                            onClick={handlePayment} 
                            className="w-full h-14 rounded-full bg-[#111] hover:bg-black text-white text-lg font-medium mt-4"
                        >
                            {isLoading ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* --- NETBANKING OPTION --- */}
            <AccordionItem value="netbanking" className="border border-gray-200 rounded-xl px-2 data-[state=open]:bg-gray-50/50 transition-colors">
                <AccordionTrigger className="hover:no-underline px-4 py-5">
                    <div className="flex items-start gap-4 text-left">
                        <Landmark className="h-6 w-6 text-gray-700 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">NetBanking</p>
                            <p className="text-xs text-gray-500 font-normal">Pay through your favourite bank</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 pt-2">
                    {/* Simplified for the prototype */}
                    <p className="text-sm text-gray-500 mb-4">Select your bank to securely log in and pay.</p>
                    <Button disabled={isLoading} onClick={handlePayment} className="w-full rounded-full bg-[#111] hover:bg-black text-white">
                        {isLoading ? "Processing..." : `Proceed to NetBanking`}
                    </Button>
                </AccordionContent>
            </AccordionItem>
            
        </Accordion>
    );
}