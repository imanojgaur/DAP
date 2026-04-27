"use client";

import { useCartStore } from "@/providers/cart-store";
import { formatPrice } from "@/lib"; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ImageIcon } from "lucide-react"; 

export function OrderSummary({ isMobile = false }: { isMobile?: boolean }) {
    const items = useCartStore((state) => state.items);
    
    const totalInSubunits = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100;

    // THE ULTIMATE BULLETPROOF CHECK
    const isValidImage = (url: string | undefined | null) => {
        if (!url || url === "" || url === "undefined" || url === "null") return false;
        
        // If it's a relative path (starts with /), Next.js can handle it perfectly
        if (url.startsWith("/")) return true; 

        // If it's an absolute path (http...), we test if it actually parses
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false; // If it fails parsing, it's a corrupted string. Reject it.
        }
    };

    const SummaryContent = () => (
        <div className="space-y-4 pt-2">
            {/* 1. PRODUCT LIST */}
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                        
                        <div className="relative h-20 w-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                            {isValidImage(item.image) ? (
                                <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover" 
                                    sizes="80px" 
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <ImageIcon className="h-6 w-6 mb-1 opacity-50" />
                                    <span className="text-[10px] uppercase font-bold text-center leading-tight">No Image</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col justify-center text-sm">
                            <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
                            <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                            <p className="font-medium text-gray-900 mt-1">{formatPrice(item.price * 100)}</p>
                            <p className="text-xs font-semibold text-green-700 mt-1">Arrives in 2-3 Days</p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator className="my-4" />

            {/* 2. PRICE DETAILS */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Bag Total</span>
                    <span>{formatPrice(totalInSubunits)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping Charges</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center font-bold text-lg">
                <span>You Pay</span>
                <span>{formatPrice(totalInSubunits)}</span>
            </div>
            <p className="text-xs text-gray-500 text-right">Inclusive of all taxes</p>
        </div>
    );

    if (isMobile) {
        return (
            <Accordion type="multiple" defaultValue={["order-info", "price-details"]} className="w-full bg-white px-4 border-b border-gray-100">
                <AccordionItem value="order-info" className="border-b-0">
                    <AccordionTrigger className="font-bold text-lg hover:no-underline py-4">
                        Order Information ({items.length} items)
                    </AccordionTrigger>
                    <AccordionContent>
                        <SummaryContent />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <SummaryContent />
        </div>
    );
}