// Client Component): Manages the open/closed state of the FAQs and Care Guides.
// src/components/products/product-accordion.tsx
"use client";

import { Star } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface ReviewProps {
	id: string;
	author: string;
	rating: number;
	title: string | null;
	body: string;
	date: Date;
}

interface ProductAccordionProps {
	description: string | null;
	specifications: any | null; // Prisma JSON type
	reviews: ReviewProps[];
	totalReviews: number;
}

export function ProductAccordion({
	description,
	specifications,
	reviews,
	totalReviews,
}: ProductAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			{/* DESCRIPTION */}
			<AccordionItem value="description">
				<AccordionTrigger className="text-base font-bold md:text-lg">
					Description
				</AccordionTrigger>
				<AccordionContent className="text-base leading-relaxed text-gray-600">
					{description || "No description available."}
				</AccordionContent>
			</AccordionItem>

			{/* SPECIFICATIONS (Only render if specs exist) */}
			{specifications && Object.keys(specifications).length > 0 && (
				<AccordionItem value="specifications">
					<AccordionTrigger className="text-base font-bold md:text-lg">
						Specifications
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-3">
							{Object.entries(specifications).map(([key, value]) => (
								<div
									key={key}
									className="flex justify-between py-2 border-b border-gray-100 last:border-0"
								>
									<span className="capitalize text-gray-500">
										{key.replace(/_/g, " ")}
									</span>
									<span className="font-medium text-gray-900">
										{String(value)}
									</span>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			)}

			{/* REVIEWS (First Print + Load More Placeholder) */}
			<AccordionItem value="reviews">
				<AccordionTrigger className="text-base font-bold md:text-lg">
					Reviews ({totalReviews})
				</AccordionTrigger>
				<AccordionContent>
					{reviews.length === 0 ? (
						<p className="italic text-gray-500">No reviews yet.</p>
					) : (
						<div className="flex flex-col gap-6 pt-4">
							{reviews.map((review) => (
								<div key={review.id} className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<span className="font-bold text-gray-900">
											{review.author}
										</span>
										<span className="text-xs text-gray-400">
											{new Date(review.date).toLocaleDateString()}
										</span>
									</div>
									<div className="flex text-yellow-400">
										{[...Array(5)].map((_, i) => (
											<Star
												key={review.id}
												className={`w-4 h-4 ${i < Math.floor(review.rating) ? "fill-current" : "text-gray-200"}`}
											/>
										))}
									</div>
									{review.title && (
										<h4 className="font-semibold text-gray-800">
											{review.title}
										</h4>
									)}
									<p className="text-sm text-gray-600">{review.body}</p>
								</div>
							))}

							{/* PLACEHOLDER: If total reviews are more than what we fetched, show the button */}
							{totalReviews > reviews.length && (
								<Button
									variant="outline"
									className="w-full mt-4"
									onClick={() => console.log("TODO: Fetch remaining reviews")}
								>
									Read All {totalReviews} Reviews
								</Button>
							)}
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
