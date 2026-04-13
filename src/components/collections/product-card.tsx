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

	return (
		<Card className="group w-full max-w-sm overflow-hidden transition-all hover:shadow-lg flex flex-col">
			<CardHeader className="p-0">
				{/* 3. Wrap the Image Container in a Link */}
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
						{plant.categories[0]?.name || "Plant"}
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

			<CardContent className="p-4 flex-grow">
				{/* 4. Wrap the Title in a Link and add a hover effect */}
				<CardTitle className="text-l line-clamp-1">
					<Link
						href={productUrl}
						className="hover:text-primary hover:underline transition-colors"
					>
						{plant.name}
					</Link>
				</CardTitle>
				<CardDescription className="mt-2 line-clamp-2 italic"></CardDescription>
			</CardContent>

			<CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
				<div className="flex flex-col">
					<span className="text-lg font-bold text-green-700">
						{currentPrice} {/* Assuming price is in paise */}
					</span>
					{(plant.compareAtPrice ?? 0) > plant.price && (
						<span className="text-sm text-muted-foreground line-through">
							{lineOverPrice}
						</span>
					)}
				</div>
				{/* 5. Keep the Add to Cart Button completely separate from the links */}
				<Button
					size="sm"
					onClick={() => console.log(`Added ${plant.name} to cart`)}
				>
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
