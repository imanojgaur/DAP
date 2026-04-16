// src/app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data";
import { ProductHeader } from "@/components/products/header";
import { ProductGallery } from "@/components/products/product-gallery";
import { MobileCartBar } from "@/components/products/mobile-cart-bar";
import { ProductDetails } from "@/components/products/product-details";
import { ProductAccordion } from "@/components/products/product-accordions";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const product = await getProductBySlug(slug);

	if (!product) notFound();

	return (
		// Added pb-24 so the MobileCartBar doesn't cover your lowest content
		<main className="relative pb-24 md:pb-0">
			<section className="max-w-7xl mx-auto px-4 py-4 md:py-16 sm:px-6 lg:px-8">
				
				{/* Desktop: 2 Columns. Mobile: Stacked */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
					
					{/* LEFT COLUMN: Gallery */}
					<div className="w-full h-fit sticky top-24">
						<ProductGallery images={product.images} />
					</div>

					{/* RIGHT COLUMN: The Data Stack */}
					<div className="flex flex-col">
						<ProductHeader
							name={product.name}
							price={product.price}
							compareAtPrice={product.compareAtPrice}
						/>

						{/* Desktop "Add to Cart" button would go here */}

						<ProductDetails 
							careDifficulty={product.careDifficulty}
							isPetSafe={product.isPetSafe}
							categories={product.categories}
						/>

						<ProductAccordion 
							description={product.description}
							specifications={product.specifications}
							reviews={product.reviews}
							totalReviews={product.totalReviews}
						/>
					</div>

				</div>
			</section>

			{/* FIXED MOBILE BAR: Kept completely outside the grid */}
			<MobileCartBar name={product.name} price={product.price} />
		</main>
	);
}