"use client";

import { useCartStore } from "@/providers/cart-store";
import { formatPrice } from "@/lib"; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CldImage } from "next-cloudinary";
import { ImageIcon, Info } from "lucide-react"; 

export function OrderSummary() {
    const items = useCartStore((state) => state.items);
    const totalInSubunits = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100;

    if (items.length === 0) return null;

    return (
        <div className="bg-white md:p-6 md:rounded-2xl md:border border-gray-100 sticky top-24">
            
            {/* Desktop Only Header */}
            <h2 className="hidden md:block text-xl font-bold mb-6">Order Summary</h2>

            <Accordion type="multiple" defaultValue={["bag", "price"]} className="w-full border-t border-gray-100 md:border-t-0">
                
                {/* --- SECTION 1: THE BAG --- */}
                <AccordionItem value="bag" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-4 px-4 md:px-0">
                        <div className="flex justify-between w-full pr-4 text-lg font-bold text-gray-900">
                            <span>Bag</span>
                            <span className="font-normal text-sm text-gray-500 mt-0.5">{items.length} Items</span>
                        </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 md:px-0">
                        <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    {/* Image with Mobile Quantity Badge */}
                                    <div className="relative h-20 w-20 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                                        {item.image ? (
                                            <CldImage src={item.image} alt={item.name} fill className="object-cover rounded-lg" sizes="80px" />
                                        ) : (
                                            <ImageIcon className="h-6 w-6 text-gray-300" />
                                        )}
                                        {/* NIKE STYLE QUANTITY BADGE */}
                                        {item.quantity > 1 && (
                                            <span className="absolute -bottom-1.5 -right-1.5 bg-gray-200 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                                                x{item.quantity}
                                            </span>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col text-sm pr-2">
                                        <p className="font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                                        <p className="text-gray-500 text-xs mb-1">Size Standard &nbsp;&nbsp; Green</p>
                                        <p className="text-xs font-semibold text-gray-900 mt-auto">Delivery in 2 days</p>
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="text-sm font-medium text-gray-900 shrink-0">
                                        {formatPrice(item.price * item.quantity * 100)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <div className="h-px bg-gray-100 w-full my-2 hidden md:block" />

                {/* --- SECTION 2: PRICE DETAILS --- */}
                <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-4 px-4 md:px-0 border-t border-gray-100 md:border-t-0">
                        <div className="flex justify-between w-full pr-4 text-lg font-bold text-gray-900">
                            <span>Price Details</span>
                            <span className="font-normal text-sm text-gray-500 mt-0.5">{formatPrice(totalInSubunits)}</span>
                        </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 md:px-0 space-y-3 pt-2">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Bag Total</span>
                            <span>{formatPrice(totalInSubunits)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm items-center">
                            <span className="flex items-center gap-1">
                                Shipping Charges <Info className="h-3.5 w-3.5 text-gray-400" />
                            </span>
                            <span className="text-green-700 font-medium tracking-wide">Free</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-gray-100 mt-2">
                            <span>You Pay</span>
                            <span>{formatPrice(totalInSubunits)}</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <p className="text-[11px] text-gray-400 px-4 md:px-0 mt-6 pb-4">Powered by YourBrand Limited</p>
        </div>
    );
}