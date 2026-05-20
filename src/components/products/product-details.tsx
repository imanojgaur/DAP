// ProductDetails.tsx: (Server Component): Renders the title, price, and badges.
// src/components/products/product-details.tsx
import { Leaf, ShieldAlert, ShieldCheck, Tag } from "lucide-react";

interface ProductDetailsProps {
	careDifficulty: string;
	isPetSafe: boolean;
	categories: { name: string; slug: string }[];
}

export function ProductDetails({
	careDifficulty,
	isPetSafe,
	categories,
}: ProductDetailsProps) {
	return (
		<div className="grid grid-cols-2 gap-4 py-6 my-6 border-y border-gray-100 md:grid-cols-3">
			{/* Care Level */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2 text-gray-500">
					<Leaf className="w-4 h-4 text-green-600" />
					<span className="text-xs font-semibold tracking-wider uppercase">
						Care
					</span>
				</div>
				<span className="text-sm font-medium text-gray-900 capitalize">
					{careDifficulty}
				</span>
			</div>

			{/* Toxicity */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2 text-gray-500">
					{isPetSafe ? (
						<ShieldCheck className="w-4 h-4 text-green-600" />
					) : (
						<ShieldAlert className="w-4 h-4 text-amber-500" />
					)}
					<span className="text-xs font-semibold tracking-wider uppercase">
						Toxicity
					</span>
				</div>
				<span className="text-sm font-medium text-gray-900">
					{isPetSafe ? "Pet Safe" : "Keep away from pets"}
				</span>
			</div>

			{/* Categories */}
			{categories.length > 0 && (
				<div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
					<div className="flex items-center gap-2 text-gray-500">
						<Tag className="w-4 h-4 text-green-600" />
						<span className="text-xs font-semibold tracking-wider uppercase">
							Type
						</span>
					</div>
					<div className="flex flex-wrap gap-1.5">
						{categories.map((cat) => (
							<span
								key={cat.slug}
								className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md"
							>
								{cat.name}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
