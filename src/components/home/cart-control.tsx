'use client'

import { useCart } from "@/store/cart-store"
import { Button } from "../ui/button"

export function AddToCartButton () {

	const increment = useCart((state) => state.addProduct)

	return (
		<Button 
		size="xs" 
		variant="outline"
		onClick={increment}
		>
			Add To Cart
		</Button>
	)
}