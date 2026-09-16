import prisma from "@/lib/backend/prisma";

export async function getCategories(slug: string[]) {
	return await prisma.category.findMany({
		where: {
			slug: {
				in: slug,
			},
		},
		select: {
			name: true,
			slug: true,
			_count: {
				select: {
					products: true,
				},
			},
		},
	});
}

export async function getFeatureProducts(homeCategory: "home") {
	return await prisma.product.findMany({
		where: {
			categories: {
				some: {
					slug: homeCategory,
				},
			},
		},
		select: {
			id: true,
			name: true,
			slug: true,
			price: true,
			compareAtPrice: true,
			stockQuantity: true,
			totalReviews: true,
			averageRating: true,
			images: {
				select: {
					publicId: true,
					height: true,
					width: true,
					isPrimary: true,
				},
			},
		},
		take: 20,
	});
}

//===========================================================================
// Export types
//===========================================================================
// for home categories 
//---------------------------------------------------------------------------
export type FetchedCategoryArray = Awaited<ReturnType<typeof getCategories>>;
export type FetchedCategory = FetchedCategoryArray[0]

//---------------------------------------------------------------------------
// for home featured products
//---------------------------------------------------------------------------
export type FetchedProductArray = Awaited<ReturnType<typeof getFeatureProducts>>
export type FetchProduct = FetchedProductArray[0]