"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { useCartStore } from "@/providers/cart-store"; // 1. Updated import

// 2. Define the exact props we need to add a real item to the cart
interface DesktopCartActionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        slug: string;
        image: string;
    }
}

export function DesktopCartActions({ product }: DesktopCartActionsProps) {
    // 3. Connect to the real Zustand array
    const addItem = useCartStore((state) => state.addItem);

    // 4. Create handler functions
    const handleAddToCart = () => {
        addItem(product);
    };

    const handleBuyNow = () => {
        addItem(product);
        // In the future, you can import useRouter and do: router.push('/cart') here!
    };

    return (
        <div className="hidden md:flex items-center gap-4 py-6 border-b border-gray-100">
            
            <Button
                size="lg"
                variant="outline"
                className="w-1/2 h-14 text-lg border-green-600 text-green-700 hover:bg-green-50 transition-colors"
                onClick={handleAddToCart}
            >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
            </Button>

            <Button
                size="lg"
                className="w-1/2 h-14 text-lg bg-green-700 hover:bg-green-800 text-white transition-all shadow-md hover:shadow-lg"
                onClick={handleBuyNow}
            >
                <Zap className="w-5 h-5 mr-2 fill-current" />
                Buy it Now
            </Button>
            
        </div>
    );
}