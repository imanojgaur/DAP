import { notFound } from "next/navigation";
import { ProductHeader } from "@/components/products/header";
import { ProductGallery } from "@/components/products/product-gallery";
import { getProductBySlug } from "@/data";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const product = await getProductBySlug(slug);

	if (!product) notFound();

	return (
		<section className="max-w-7xl mx-auto px-4 py-4 md:py-16 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
				<ProductHeader
					name={product.name}
					price={product.price}
					compareAtPrice={product.compareAtPrice}
				/>
				<ProductGallery images={product.images} />
			</div>
		</section>
	);
}
