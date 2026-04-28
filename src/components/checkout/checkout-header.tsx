"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Lock } from "lucide-react";

export function CheckoutHeader() {
    const pathname = usePathname();
    const isPayment = pathname.includes("/payment");

    return (
        <header className="hidden md:flex justify-between items-center px-8 h-[72px] border-b border-gray-200 bg-white sticky top-0 z-50">
            {/* 1. Logo */}
            <div className="w-32">
                <Link href="/" className="font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
                    DAP
                </Link>
            </div>
            
            {/* 2. The 3-Step Tracker */}
            <nav aria-label="Checkout Progress" className="flex items-center gap-4 text-sm font-medium">
                {/* Step 1: Sign Up (Always Complete) */}
                <span className="flex items-center gap-2 text-black">
                    <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center">
                        <Check className="h-3 w-3" />
                    </div> 
                    Sign Up
                </span>
                
                <div className="w-12 h-[1px] bg-black"></div>
                
                {/* Step 2: Address */}
                <span className={`flex items-center gap-2 ${isPayment ? "text-black" : "text-black font-bold"}`}>
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs ${isPayment ? "bg-black text-white" : "bg-black text-white"}`}>
                        {isPayment ? <Check className="h-3 w-3" /> : "2"}
                    </div> 
                    Address
                </span>
                
                <div className={`w-12 h-[1px] ${isPayment ? "bg-black" : "bg-gray-200"}`}></div>
                
                {/* Step 3: Payment */}
                <span className={`flex items-center gap-2 ${isPayment ? "text-black font-bold" : "text-gray-400"}`}>
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs ${isPayment ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}>
                        3
                    </div> 
                    Payment
                </span>
            </nav>
            
            {/* 3. Secure Icon */}
            <div className="w-32 flex justify-end text-gray-500" title="256-bit Encrypted Checkout">
                <Lock className="h-5 w-5" />
            </div>
        </header>
    );
}