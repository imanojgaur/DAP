"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib"; // Adjust if needed
import { useCartStore } from "@/providers/cart-store";

export function CartDrawer() {
	// Kept the name same so your Header doesn't break imports
	const items = useCartStore((state) => state.items);
	const cartCount = items.reduce((total, item) => total + item.quantity, 0);

	return (
		<Link
			href={ROUTES.CART || "/cart"}
			className="relative flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors group"
		>
			<ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />

			{cartCount > 0 && (
				<span className="absolute 0 -right-1 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-700 text-[10px] text-white font-bold shadow-sm">
					{cartCount}
				</span>
			)}
		</Link>
	);
}
