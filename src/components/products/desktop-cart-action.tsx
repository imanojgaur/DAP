"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { useCounterStore } from "@/providers/counter-store-provider";

export function DesktopCartActions() {
    // Connect to your Zustand store scaffolding
    const incrementCount = useCounterStore((state) => state.incrementCount);

    const handleBuyNow = () => {
        incrementCount();
        // In the future, this will also route the user directly to the checkout page
        // router.push('/checkout');
    };

    return (
        // hidden on mobile, flex on medium screens and up
        <div className="hidden md:flex items-center gap-4 py-6 border-b border-gray-100">
            
            {/* Add to Cart - Secondary Outline */}
            <Button
                size="lg"
                variant="outline"
                className="w-1/2 h-14 text-lg border-green-600 text-green-700 hover:bg-green-50 transition-colors"
                onClick={incrementCount}
            >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
            </Button>

            {/* Buy it Now - Primary Solid */}
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