'use client'

import { useCart } from "@/store/cart-store";
import { DoddleStickerCart } from "./layout-icon";

export function HeaderCartTrigger() {
    const cartProduct = useCart((state) => state.productCount)
    const decrement = useCart((state) => state.removeProduct)
    return (
        <div className="relative inline-flex items-center justify-center">
            {/* The Cart Button (Scales everything together) */}
            <button 
                type="button" 
                onClick={decrement} 
                className="group relative z-10 flex items-center justify-center text-gray-800 transition-all duration-300 ease-out hover:scale-110 hover:text-emerald-500"
            >
                {/* 1. The Cart Icon */}
                <DoddleStickerCart />
                
                {/* 2. The Giant Embedded Number */}
                {/* absolute inset-0 forces it to map exactly to the button's edges */}
                <span className="absolute inset-0 z-20 flex items-center justify-center pt-2 pointer-events-none">
                    <span className="text-2xl font-black text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
                        {cartProduct}
                    </span>
                </span>
            </button>
        </div>
    );
}