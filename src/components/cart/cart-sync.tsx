"use client";

import { useEffect, useRef } from "react";
import { getSession } from "next-auth/react";
import { useCartStore } from "@/providers/cart-store";
import { syncCartAction } from "@/actions/cart";

export function CartSync() {
    // Grab the current items from our Zustand store
    const items = useCartStore((state) => state.items);
    
    // Use a ref to ensure we only sync once per session to avoid spamming the database
    const hasSynced = useRef(false);

    useEffect(() => {
        async function checkAndSync() {
            // If the cart is empty or we already synced, do nothing
            if (items.length === 0 || hasSynced.current) return;

            // Check if the user is currently logged in
            const session = await getSession();
            
            if (session?.user) {
                // User is logged in! Fire the server action
                const result = await syncCartAction(items);
                
                if (result.success) {
                    hasSynced.current = true;
                    console.log("Cart successfully synced to database!");
                }
            }
        }

        checkAndSync();
    }, [items]); // Re-run if items change (in case they log in, then add more stuff)

    return null; // This component renders absolutely nothing to the screen
}