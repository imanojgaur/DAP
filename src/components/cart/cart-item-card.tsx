"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, useCartStore } from "@/providers/cart-store";
import { formatPrice } from "@/lib";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";

export function CartItemCard({ item }: { item: CartItem }) {
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	return (
		<Card className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-all">
			{/* --- MOBILE STRIP VIEW (Visible only on small screens) --- */}
			<div className="flex items-center gap-3 p-3 sm:hidden">
				{/* 1. Small Thumbnail */}
				<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
					{item.image ? (
						<CldImage
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-gray-100 text-[10px] text-gray-400">
							No Img
						</div>
					)}
				</div>

				{/* 2. Info & Controls */}
				<div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
					<div className="flex justify-between items-start">
						<Link href={`/product/${item.slug}`} className="line-clamp-1 text-sm font-bold text-gray-900 pr-2">
							{item.name}
						</Link>
						<span className="text-sm font-black text-gray-900 shrink-0">
							{formatPrice(item.price * item.quantity)}
						</span>
					</div>

					<div className="flex items-center justify-between mt-auto">
						{/* Compact Quantity Pill */}
						<div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-0.5">
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 hover:bg-white"
								onClick={() => updateQuantity(item.id, item.quantity - 1)}
								disabled={item.quantity <= 1}
							>
								<Minus className="h-3 w-3" />
							</Button>
							<span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 hover:bg-white"
								onClick={() => updateQuantity(item.id, item.quantity + 1)}
							>
								<Plus className="h-3 w-3" />
							</Button>
						</div>

						{/* Trash Icon Only */}
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
							onClick={() => removeItem(item.id)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* --- DESKTOP CARD VIEW (Hidden on mobile, flex on sm+) --- */}
			<div className="hidden sm:flex p-6 gap-6">
				{/* Image Section */}
				<Link href={`/product/${item.slug}`} className="shrink-0">
					<div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
						{item.image ? (
							<CldImage
								src={item.image}
								alt={item.name}
								fill
								className="object-cover transition-transform hover:scale-105"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
								No Image
							</div>
						)}
					</div>
				</Link>

				{/* Details Section */}
				<div className="flex flex-1 flex-col justify-between">
					<div className="flex justify-between items-start">
						<div>
							<Link href={`/product/${item.slug}`} className="hover:text-green-700 hover:underline">
								<h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">{item.name}</h3>
							</Link>
							<p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Ready to Ship</p>
						</div>
						<div className="text-right">
							<p className="text-xl font-black text-gray-900">{formatPrice(item.price * item.quantity)}</p>
							{item.quantity > 1 && (
								<p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>
							)}
						</div>
					</div>

					<div className="flex items-center justify-between mt-6">
						{/* Quantity Controls */}
						<div className="flex items-center space-x-3 bg-gray-50 border border-gray-100 rounded-full p-1">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm"
								onClick={() => updateQuantity(item.id, item.quantity - 1)}
								disabled={item.quantity <= 1}
							>
								<Minus className="h-3.5 w-3.5" />
							</Button>
							<span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm"
								onClick={() => updateQuantity(item.id, item.quantity + 1)}
							>
								<Plus className="h-3.5 w-3.5" />
							</Button>
						</div>

						<Button
							variant="ghost"
							size="sm"
							className="text-gray-400 hover:text-red-600 hover:bg-red-50 font-medium"
							onClick={() => removeItem(item.id)}
						>
							<Trash2 className="h-4 w-4 mr-2" />
							Remove
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}