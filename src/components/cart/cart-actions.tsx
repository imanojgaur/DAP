'use client'

import { type ProductInfo, useCart } from "@/store/cart-store"
import { Button } from "../ui/button"
import { Plus, Minus, Trash2 } from "lucide-react";

// ==========================================
// 1. ACTION TRIGGERS
// ==========================================

export function AddToCartButton(productInfo: ProductInfo) {
    const addProductToCart = useCart((state) => state.addProduct)
    // const mutatingProductInfo = productInfo

    // const extinsibleProductInfo = {...productInfo}
    
    // productInfo represents the entire props object here, which perfectly matches the Zustand store item!
    return (
        // <Button onClick={() => addProductToCart({...productInfo})}>
        <Button onClick={() => addProductToCart(productInfo)}>
            Add To Cart 
        </Button>
    )
}

export function CartAddRemoveItemButtons({productId}:{productId: string}) {
    // const addItemCount = useCart((state) => state.items.find())
	return (
		<div className="flex items-center justify-start gap-2 mt-auto">
			<Minus/> 
			<Plus/> 
			<Trash2/>
		</div>
	)
}