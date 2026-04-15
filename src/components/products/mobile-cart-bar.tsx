// (Client Component): Handles the quantity state and the submission to your cart API.
"use client";

import { Button } from "@/components/ui/button"; 
import { formatPrice } from "@/lib";

interface MobileCartBarProps {
    name: string;
    price: number;
}

export function MobileCartBar({ name, price }: MobileCartBarProps) {
   
    const formatedPrice = formatPrice(price);
    return (
        // 1. THE POSITIONING: fixed to bottom, full width, high z-index to float over content
        // 2. THE VISIBILITY: hidden on medium screens and up (md:hidden)
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-black border-t border-gray-800 px-4 py-3 md:hidden">
            
            <div className="flex items-center justify-between gap-4">
                
                {/* Left Side: Gentle reminder of what they are buying and the price */}
                <div className="flex flex-col truncate">
                    <span className="text-xs text-gray-400 truncate capitalize">
                        {name.replace(/-/g, " ")}
                    </span>
                    <span className="text-lg font-bold text-white">
                        {formatedPrice}
                    </span>
                </div>

                {/* Right Side: The Shadcn Button (Styled to pop against the black background) */}
                <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-8 shrink-0"
                    onClick={() => console.log("Zustand addToCart goes here!")}
                >
                    Add to Cart
                </Button>
                
            </div>
        </div>
    );
}