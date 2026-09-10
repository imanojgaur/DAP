'use client'

import { type ProductInfo, useCart } from "@/store/cart-store"
import { Button } from "../ui/button"
import { Plus, Minus, Trash2 } from "lucide-react";

// ==========================================
// 1. ACTION TRIGGERS
// ==========================================

export function AddToCartButton(productInfo: ProductInfo) {
    const addProductToCart = useCart((state) => state.addNewItem)

    return (
        <Button onClick={() => addProductToCart(productInfo)}>
            Add To Cart 
        </Button>
    )
}

export function CartAddRemoveItemButtons({productId}:{productId: string}) {
    const incrementItemCount = useCart((state) => state.increaseQuantity)
    const decrementItemCount = useCart((state) => state.decreaseQuantity)
    const removeItem = useCart((state) => state.removeItem)

    const itemCount = useCart((state) => state.items.find((item) => item.id === productId)?.itemCount)
    
	return (
		<div className="flex items-center justify-start gap-2 mt-auto">
            <button 
            type="button" 
            onClick={() => incrementItemCount(productId)} 
            className="">
	    		<Plus/> 
            </button>

            <span
            className="text-sm font-medium text-center">
                {itemCount}
            </span>

            <button 
            type="button" 
            onClick={() => decrementItemCount(productId)} 
            className="">
			    <Minus/> 
            </button>

            <button 
            type="button" 
            onClick={() => removeItem(productId)}
            className=""
            >
		    	<Trash2/>
            </button>
		</div>
	)
}