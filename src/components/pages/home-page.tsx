"use client";

import { useCartStore } from "@/providers/cart-store"; // 1. Correct the import

export function HomePage() {
    // 2. Select the items array and calculate the count
    const items = useCartStore((state) => state.items);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                Bring Greenery Home
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mb-8">
                Explore our curated collection of indoor plants, pots, and tools designed for modern living.
            </p>
            
            {/* 3. Update any test UI you had there */}
            {cartCount > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-green-700 font-medium">
                    You have {cartCount} plants in your cart! 🌱
                </div>
            )}
            
            {/* If you had a button here that used 'incrementCount', delete it! 
                The Home Page should lead users to /collections or /services */}
        </div>
    );
}