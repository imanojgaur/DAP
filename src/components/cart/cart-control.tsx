'use client'

import { type ReceivedItemInfo, useCart } from "@/store/cart-store"
import { Button } from "../ui/button"
import { Plus, Minus, Trash2 } from "lucide-react";
import { cn } from "@/utilities/utils";

// ==========================================
// 1. ACTION TRIGGERS
// ==========================================

export function AddToCartButton(productInfo: ReceivedItemInfo) {
    const addProductToCart = useCart((state) => state.addNewItem)

    return (
        <Button onClick={() => addProductToCart(productInfo)}>
            Add To Cart 
        </Button>
    )
}

export function CartQuantityControl({
    productId,
    className, 
}:{
    productId: string,
    className?: string, 
}) {
    const incrementItemCount = useCart((state) => state.increaseQuantity)
    const decrementItemCount = useCart((state) => state.decreaseQuantity)
    const removeItem = useCart((state) => state.removeItem)

    const itemCount = useCart((state) => state.items.find((item) => item.id === productId)?.itemCount)
    
	return (
		<div className={cn(`flex items-center justify-start gap-2 mt-auto`, `${className}`)}>
            <button 
            type="button" 
            disabled={itemCount === 1}
            onClick={() => decrementItemCount(productId)} 
            className={`flex items-center justify-center p-1.5 text-muted-foreground hover:text-forground hover:bg-muted disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent disabled:opacity-40 rounded-l-md transition-colors duration-300 ease-out cursor-pointer`}
            >
			    <Minus size={16} strokeWidth={3}/> 
            </button>

            <span
            className="p-1 w-6 h-full text-sm text-center text-foreground font-semibold muted-background rounded-md ">
                {itemCount || 0}
            </span>

            <button 
            type="button" 
            onClick={() => incrementItemCount(productId)} 
            className="flex items-center justify-center p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md cursor-pointer ">
	    		<Plus size={16} strokeWidth={3}/>
            </button>

            <button 
            type="button" 
            onClick={() => removeItem(productId)}
            className="flex items-center justify-center p-1.5 text-muted-foreground hover:text-red-500 border-border hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors ease-out duration-300 cursor-pointer"
            >
		    	<Trash2 size={16}/>
            </button>
		</div>
	)
}