"use client";

import { ShieldCheck } from "lucide-react";
// 1. IMPORT LINK
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib"; // Assuming you have this helper
import { useCartStore } from "@/providers/cart-store";

export function OrderSummary() {
	const items = useCartStore((state) => state.items);

	// Calculate Subtotal dynamically
	const subtotal = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	// Assume free shipping for now, or add logic here
	const shipping = 0;
	const total = subtotal + shipping;

	// If cart is empty, don't render the summary
	if (items.length === 0) return null;

	return (
		<Card className="w-full border-gray-200 shadow-sm sticky top-24">
			<CardHeader>
				<CardTitle className="text-xl font-bold">Order Summary</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex justify-between text-gray-600">
					<span>Subtotal</span>
					<span className="font-medium text-gray-900">
						{formatPrice(subtotal)}
					</span>
				</div>

				<div className="flex justify-between text-gray-600">
					<span>Estimated Delivery</span>
					<span className="font-medium text-green-600">Free</span>
				</div>

				<Separator className="my-4" />

				<div className="flex justify-between items-end">
					<span className="text-lg font-bold text-gray-900">Total</span>
					<span className="text-2xl font-extrabold text-gray-900">
						{formatPrice(total)}
					</span>
				</div>
				<p className="text-xs text-gray-500 text-right">
					Inclusive of all taxes
				</p>
			</CardContent>

			<CardFooter className="flex flex-col gap-4">
				{/* 2. WRAP BUTTON IN LINK USING asChild */}
				<Button
					asChild
					className="w-full h-14 text-lg font-bold bg-green-700 hover:bg-green-800 text-white rounded-xl"
				>
					<Link href="/addresses">Proceed to Buy</Link>
				</Button>

				<div className="flex items-center justify-center text-xs text-gray-500 w-full">
					<ShieldCheck className="w-4 h-4 mr-1 text-green-600" />
					Secure Encrypted Checkout
				</div>
			</CardFooter>
		</Card>
	);
}
