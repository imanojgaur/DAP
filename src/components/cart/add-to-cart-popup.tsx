"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib";
import { useCartStore } from "@/providers/cart-store";

export function CartNotification() {
	const { items, lastAddedItem, showNotification, closeNotification } =
		useCartStore();

	// UX Standard: 6 seconds (6000ms) for notifications with action buttons
	useEffect(() => {
		if (showNotification) {
			const timer = setTimeout(() => {
				closeNotification();
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [showNotification, closeNotification]);

	if (!showNotification || !lastAddedItem) return null;

	const cartCount = items.reduce((total, item) => total + item.quantity, 0);

	return (
		<>
			{/* Dark overlay for mobile only */}
			<button
				type="button"
				aria-label="Close notification"
				className="fixed inset-0 w-full h-full bg-black/20 z-[90] md:hidden animate-in fade-in duration-300 cursor-default border-none outline-none"
				onClick={closeNotification}
			/>

			{/* ADDED md:left-auto TO FIX THE POSITIONING BUG! */}
			<div
				className="fixed z-[100] w-full bg-white shadow-2xl transition-all duration-300 ease-out 
                /* MOBILE: Bottom sheet layout */
                bottom-0 left-0 rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom-[100%]
                /* DESKTOP: Top right floating card */
                md:top-24 md:bottom-auto md:left-auto md:right-8 md:w-[400px] md:rounded-2xl md:p-6 md:animate-in md:slide-in-from-top-4 md:fade-in-90"
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center text-green-700 font-bold gap-2">
						<CheckCircle2 className="h-5 w-5 fill-current text-white bg-green-700 rounded-full" />
						<span>Added to Bag</span>
					</div>
					<button
						type="button"
						onClick={closeNotification}
						className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Product Details */}
				<div className="flex gap-4 mb-6">
					<div className="relative h-24 w-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
						{lastAddedItem.image ? (
							<CldImage
								src={lastAddedItem.image}
								alt={lastAddedItem.name}
								fill
								className="object-cover"
								sizes="96px"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase">
								No Img
							</div>
						)}
					</div>
					<div className="flex flex-col text-sm">
						<span className="font-bold text-gray-900 leading-tight mb-1">
							{lastAddedItem.name}
						</span>
						<span className="text-gray-500 mb-0.5">Size: Standard</span>
						<span className="font-medium text-gray-900 mb-1">
							{formatPrice(lastAddedItem.price)}
						</span>
						<span className="text-xs text-gray-500">
							Inclusive of all taxes
						</span>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex gap-3">
					<Button
						asChild
						onClick={closeNotification}
						className="w-full h-14 rounded-full bg-[#111] hover:bg-black text-white font-bold text-lg"
					>
						<Link href="/cart">View Bag ({cartCount})</Link>
					</Button>
				</div>
			</div>
		</>
	);
}
