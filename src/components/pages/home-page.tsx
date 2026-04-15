"use client";

import { useCounterStore } from "@/providers/counter-store-provider";

export  function HomePage() {
    // 1. ZUSTAND FIX: Select individual pieces of state so React knows exactly what to track
    const count = useCounterStore((state) => state.count);
    const incrementCount = useCounterStore((state) => state.incrementCount);
    const decrementCount = useCounterStore((state) => state.decrementCount);

    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-8">
            
            {/* The Counter Display */}
            <div className="text-4xl font-extrabold tracking-tight text-gray-900">
                Count: <span className="text-green-600">{count}</span>
            </div>
            
            {/* 2. TAILWIND FIX: Add physical shapes, colors, and hover states to the buttons */}
                <h1 className="text-xl">{`Untill this App Gets completed Play around with `} <span className="font-bold">Zustand</span> </h1>
            <div className="flex gap-4">
                <button 
                    type="button" 
                    onClick={decrementCount}
                    className="px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors shadow-sm border border-gray-200"
                >
                    Decrement
                </button>
                
                <button 
                    type="button" 
                    onClick={incrementCount}
                    className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                >
                    Increment
                </button>
            </div>

        </div>
    );
};