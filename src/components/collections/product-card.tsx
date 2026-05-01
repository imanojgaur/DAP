"use client";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { calculateDiscountPercentage, formatPrice } from "@/lib";
// 1. UPDATED IMPORT
import { useCartStore } from "@/providers/cart-store";
import type { ProductCardTypes } from "@/types";

export function ProductCard({ plant }: { plant: ProductCardTypes }) {
	const productUrl = `/products/${plant.slug}`;
	const discountPercent = calculateDiscountPercentage(
		plant.price,
		plant.compareAtPrice,
	);
	const currentPrice = formatPrice(plant.price);
	const lineOverPrice = plant.compareAtPrice
		? formatPrice(plant.compareAtPrice)
		: null;

	// 2. UPDATED STORE SELECTOR
	const addItem = useCartStore((state) => state.addItem);

	// 3. HANDLER FOR ADD TO CART
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevents clicking the button from triggering the Card's Link
		addItem({
			id: plant.id,
			name: plant.name,
			price: plant.price,
			slug: plant.slug,
			image: plant.images[0]?.publicId || "", // We use publicId for CldImage compatibility
		});
	};

	return (
		<Card className="group w-full max-w-sm overflow-hidden transition-all hover:shadow-lg flex flex-col border-gray-200">
			<CardHeader className="p-0">
				<Link
					href={productUrl}
					className="block overflow-hidden bg-muted relative aspect-square w-full"
				>
					{plant.images[0]?.publicId && (
						<CldImage
							src={plant.images[0].publicId}
							width={500}
							height={500}
							alt={plant.name}
							className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
						/>
					)}

					<Badge className="absolute left-3 top-3 z-10" variant="secondary">
						{plant.categories?.[0]?.name || "Plant"}
					</Badge>
					{discountPercent && (
						<Badge
							className="absolute right-3 top-3 z-10"
							variant="destructive"
						>
							{discountPercent}% OFF
						</Badge>
					)}
				</Link>
			</CardHeader>

			<CardContent className="p-4 flex-grow text-left">
				<CardTitle className="text-lg line-clamp-1">
					<Link
						href={productUrl}
						className="hover:text-green-700 transition-colors"
					>
						{plant.name}
					</Link>
				</CardTitle>
				<CardDescription className="mt-2 line-clamp-2 italic text-gray-500">
					{/* Add plant-specific subtitle or description here if needed */}
				</CardDescription>
			</CardContent>

			<CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
				<div className="flex flex-col">
					<span className="text-lg font-bold text-green-700">
						{currentPrice}
					</span>
					{(plant.compareAtPrice ?? 0) > plant.price && (
						<span className="text-sm text-gray-400 line-through">
							{lineOverPrice}
						</span>
					)}
				</div>

				{/* 4. UPDATED BUTTON ACTION */}
				<Button
					size="sm"
					className="bg-green-700 hover:bg-green-800 text-white rounded-lg"
					onClick={handleAddToCart}
				>
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
