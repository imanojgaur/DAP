"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import React from "react";
import { useCart } from "@/store/cart-store";

// Store & Types
import type { ReceivedItemInfo } from "@/store/cart-store";

// UI Components
import { Button } from "../ui/button";
import { SheetClose, SheetFooter } from "../ui/sheet";
import { CartQuantityControl } from "./cart-control";
import { cn } from "@/utilities/utils";

// ============================================================================
// 1. STANDARD CART CARD
// ============================================================================
// Represents a single product row in the cart.
// Wrapped in React.memo so it only re-renders if its specific 'item' props change.

export const CartCard = React.memo(function CartCardBase({
	item,
	className
}: {
	item: ReceivedItemInfo;
	className?: string; 
}) {
	return (
		<div className={cn(`flex justify-start w-full gap-4 px-4 py-4 hover:bg-muted/50 transition-colors rounded-md shadow-md ${className}`)}>
			{/* --- Product Image (Clickable) --- */}
			<SheetClose asChild>
				<Link
					href={item.href}
					className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border"
				>
					{item.imgSrc && (
						<CldImage
							src={item.imgSrc}
							alt={item.title}
							aspectRatio={30 / 20}
							fill
							className="object-cover"
							sizes="96px"
						/>
					)}
				</Link>
			</SheetClose>

			{/* --- Product Details & Controls --- */}
			<div className="flex flex-col flex-1 min-w-0">
				<SheetClose asChild>
					<Link href={item.href} className="flex flex-col gap-1.5 py-2">
						<h4 className="line-clamp-2 font-medium text-sm text-foreground text-start">
							{item.title}
						</h4>
						<div className="flex items-center justify-start gap-2">
							<span className="font-semibold text-sm">₹ {item.price}</span>
							{item.comparPriceAt && (
								<span className="text-xs line-through text-muted-foreground">
									₹ {item.comparPriceAt}
								</span>
							)}
						</div>
					</Link>
				</SheetClose>

				{/* Quantity increment/decrement buttons */}
				<CartQuantityControl productId={item.id} className="" />
			</div>
		</div>
	);
});

// ============================================================================
// 2. HIGHLIGHTED CART CARD (Recently Added)
// ============================================================================
// A stylistic wrapper around CartCard used exclusively for the item the user
// just added to the cart. Creates a visual anchor for the user's eye.

export const RecentlyAddedItem = React.memo(function RecentlyAddedItem({
	item,
	className, 
}: {
	item: ReceivedItemInfo;
	className?: string; 
}) {
	return (
		<div className={cn(`relative mb-6 rounded-lg border-2 border-primary/20 bg-primary/5 overflow-hidden shadow-sm ${className}`)}>
			{/* The Badge */}
			<div className="absolute top-0 left-0 z-10 rounded-br-lg bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
				Recently Added
			</div>

			{/* Container pushed down to prevent overlap with the badge */}
			<div className="pt-3">
				<CartCard item={item} />
			</div>
		</div>
	);
});

// ============================================================================
// 3. CART FOOTER (Subtotal & Checkout Actions)
// ============================================================================
// Sticks to the bottom of the cart drawer. Calculates the total price of all
// items currently in the Zustand store.

export function CartSheetFooter() {
	const addedItems = useCart((state) => state.items);

	// Calculates the base total 
	const totalPrice = addedItems.reduce(
		(acc, item) => acc + item.price * item.itemCount,
		0,
	);

	if (addedItems.length === 0) return null;

	return (
		<SheetFooter className="mt-auto flex flex-col pt-4 border-t border-border gap-3 sm:flex-col shadow-md border-b">
			{/* --- Premium Compact Summary Block --- */}
			<div className="flex flex-col w-full gap-1">
				<div className="flex items-baseline justify-between w-full">
					<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Subtotal
					</span>
					<span className="text-xl font-bold tracking-tight text-foreground">
						₹ {totalPrice}
					</span>
				</div>

				<p className="text-[11px] text-muted-foreground text-right leading-none">
					Taxes & shipping calculated at checkout
				</p>
			</div>

			{/* --- Call To Action Buttons --- */}
			<div className="flex flex-col gap-2 w-full mt-1">
				<SheetClose asChild>
					<Button variant="outline" className="w-full" asChild>
						<Link href="/cart">View Cart</Link>
					</Button>
				</SheetClose>
				<SheetClose asChild>
					<Button className="w-full" asChild>
						<Link href="/checkout">Proceed To Checkout</Link>
					</Button>
				</SheetClose>
			</div>
		</SheetFooter>
	);
}
