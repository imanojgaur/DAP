"use client";

import { useCartStore } from "@/providers/cart-store";
import { CartItemCard } from "./cart-item-card";
import { EmptyCart } from "./empty-cart";

export function CartItemList() {
	// Subscribe to the Zustand items array
	const items = useCartStore((state) => state.items);

	// If empty, show the placeholder
	if (items.length === 0) {
		return <EmptyCart />;
	}

	// If full, render the list
	return (
		<div className="space-y-6">
			{items.map((item) => (
				<CartItemCard key={item.id} item={item} />
			))}
		</div>
	);
}
