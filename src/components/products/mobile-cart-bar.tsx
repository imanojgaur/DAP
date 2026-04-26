"use client";

import { useCartStore } from "@/providers/cart-store"; // 1. Updated import
import { Button } from "@/components/ui/button"; 
import { formatPrice } from "@/lib";

// 2. Define the exact props we need
interface MobileCartBarProps {
    product: {
        id: string;
        name: string;
        price: number;
        slug: string;
        image: string;
    }
}

export function MobileCartBar({ product }: MobileCartBarProps) {
    // 3. Connect to Zustand
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
            <div className="flex flex-col max-w-[50%]">
                <span className="text-sm font-medium text-gray-500 line-clamp-1">{product.name}</span>
                <span className="text-lg font-extrabold text-gray-900">{formatPrice(product.price)}</span>
            </div>
            
            <Button 
                onClick={() => addItem(product)} // 4. Add the actual product to cart!
                className="h-12 px-8 text-base font-bold text-white transition-all bg-green-700 rounded-xl hover:bg-green-800 shadow-md"
            >
                Add to Cart
            </Button>
        </div>
    );
}